'use client';

import { useGSAPEnhance } from "@/hooks/useGSAPEnhance";

export default function GSAPEnhancer() {
    useGSAPEnhance({ enable: true });
    return null;
}
