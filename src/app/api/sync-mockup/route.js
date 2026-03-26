import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { FALLBACK_NEWS, FALLBACK_PLAYERS } from '@/lib/constants';

export async function GET() {
    if (!adminDb) {
        return NextResponse.json({
            success: false,
            error: "Firebase Admin SDK is not initialized. Please ensure FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY are set."
        }, { status: 500 });
    }

    try {
        const results = {
            players: { cleared: 0, seeded: 0 },
            news: { cleared: 0, seeded: 0 }
        };

        // 1. Sync Players
        const playersCol = adminDb.collection('players');
        const playerSnap = await playersCol.get();
        const pBatch = adminDb.batch();

        playerSnap.docs.forEach((d) => pBatch.delete(d.ref));
        results.players.cleared = playerSnap.size;

        FALLBACK_PLAYERS.forEach((p, idx) => {
            const pRef = playersCol.doc(`p-${idx + 1}`);

            // Map short positions to full names used in Admin/Squad logic
            let fullPos = "Midfielder";
            if (p.position === 'GK') fullPos = "Goalkeeper";
            else if (['CB', 'LB', 'RB', 'DEF'].includes(p.position)) fullPos = "Defender";
            else if (['DM', 'CM', 'AM', 'MID'].includes(p.position)) fullPos = "Midfielder";
            else if (['ST', 'LW', 'RW', 'FWD'].includes(p.position)) fullPos = "Attacker";

            pBatch.set(pRef, {
                ...p,
                position: fullPos,
                joinYear: "2024",
                appearances: Math.floor(Math.random() * 50),
                goals: p.category === 'fwd' ? Math.floor(Math.random() * 15) : 0,
                assists: Math.floor(Math.random() * 10),
                cleanSheets: p.category === 'gk' ? Math.floor(Math.random() * 10) : 0,
                createdAt: new Date().toISOString()
            });
        });
        await pBatch.commit();
        results.players.seeded = FALLBACK_PLAYERS.length;

        // 2. Sync News
        const newsCol = adminDb.collection('news');
        const newsSnap = await newsCol.get();
        const nBatch = adminDb.batch();

        newsSnap.docs.forEach((d) => nBatch.delete(d.ref));
        results.news.cleared = newsSnap.size;

        const newsData = FALLBACK_NEWS.en; // Default to English for seeding
        newsData.forEach((n, idx) => {
            const nRef = newsCol.doc(`n-${idx + 1}`);
            nBatch.set(nRef, {
                title: n.title,
                description: n.description,
                image: n.image || "",
                category: n.category || "Club News",
                date: n.date || "Mar 18, 2026",
                readTime: n.readTime || "3",
                createdAt: new Date().toISOString()
            });
        });
        await nBatch.commit();
        results.news.seeded = newsData.length;

        return NextResponse.json({
            success: true,
            message: "Firestore database successfully synchronized with HTML mockup data using Admin SDK.",
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
