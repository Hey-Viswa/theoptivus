'use client';

export default function EducationAnimation() {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-[2rem]">
            {/* Subtle top-right glow */}
            <div className="absolute -top-[20%] -right-[20%] w-[70%] h-[70%] bg-accent/5 blur-[100px] rounded-full"></div>

            {/* Subtle bottom-left glow */}
            <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-white/5 blur-[80px] rounded-full"></div>
        </div>
    );
}
