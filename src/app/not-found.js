"use client";

import Link from "next/link";
import { MoveLeft, Home } from "lucide-react";

export default function NotFound() {
    return (
        <main className="bg-vnavy min-h-screen flex items-center justify-center p-6 text-center relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-vgold/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-vsky/5 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 max-w-2xl">
                <span className="font-bebas text-vgold text-2xl tracking-[4px] block mb-4 uppercase">Error 404</span>
                <h1 className="font-bebas text-[clamp(120px,15vw,240px)] leading-[0.8] text-vwhite tracking-tighter mb-8">
                    LOST <br /> OFF <br /> PITCH
                </h1>
                <p className="font-barlow text-vmuted text-xl mb-12 max-w-md mx-auto leading-relaxed">
                    The page you are looking for has been moved or doesn't exist. Let's get you back to the main action.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        href="/"
                        className="flex items-center gap-3 bg-vgold text-vnavy font-barlow-condensed font-bold text-[14px] tracking-[2px] px-12 py-5 rounded-[12px] hover:bg-vwhite transition-all uppercase group"
                    >
                        <Home className="w-4 h-4" /> Back to Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-3 bg-vnavy-mid text-vwhite border border-vwhite/10 font-barlow-condensed font-bold text-[14px] tracking-[2px] px-12 py-5 rounded-[12px] hover:border-vgold transition-all uppercase group"
                    >
                        <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Go Back
                    </button>
                </div>
            </div>

            {/* Decorative lines */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-vwhite/10 to-transparent" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-vwhite/10 to-transparent" />
        </main>
    );
}
