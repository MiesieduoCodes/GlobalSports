import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, writeBatch, doc, serverTimestamp } from 'firebase/firestore';
import { FALLBACK_NEWS, FALLBACK_PLAYERS } from '@/lib/constants';

export async function GET() {
    try {
        const results = {
            players: { cleared: 0, seeded: 0 },
            news: { cleared: 0, seeded: 0 }
        };

        // 1. Sync Players
        const playersCol = collection(db, 'players');
        const playerSnap = await getDocs(playersCol);
        const pBatch = writeBatch(db);

        playerSnap.docs.forEach((d) => pBatch.delete(d.ref));
        results.players.cleared = playerSnap.size;

        FALLBACK_PLAYERS.forEach((p, idx) => {
            const pRef = doc(playersCol, `p-${idx + 1}`);
            pBatch.set(pRef, {
                ...p,
                joinYear: "2024",
                appearances: Math.floor(Math.random() * 50),
                goals: p.category === 'fwd' ? Math.floor(Math.random() * 15) : 0,
                assists: Math.floor(Math.random() * 10),
                cleanSheets: p.category === 'gk' ? Math.floor(Math.random() * 10) : 0,
                createdAt: serverTimestamp()
            });
        });
        await pBatch.commit();
        results.players.seeded = FALLBACK_PLAYERS.length;

        // 2. Sync News
        const newsCol = collection(db, 'news');
        const newsSnap = await getDocs(newsCol);
        const nBatch = writeBatch(db);

        newsSnap.docs.forEach((d) => nBatch.delete(d.ref));
        results.news.cleared = newsSnap.size;

        const newsData = FALLBACK_NEWS.en; // Default to English for seeding
        newsData.forEach((n, idx) => {
            const nRef = doc(newsCol, `n-${idx + 1}`);
            nBatch.set(nRef, {
                title: n.title,
                description: n.description,
                image: n.image || "",
                category: n.category || "Club News",
                date: n.date || "Mar 18, 2026",
                readTime: n.readTime || "3",
                createdAt: serverTimestamp()
            });
        });
        await nBatch.commit();
        results.news.seeded = newsData.length;

        return NextResponse.json({
            success: true,
            message: "Firestore database successfully synchronized with HTML mockup data.",
            results
        });

    } catch (error) {
        console.error("Sync error:", error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
