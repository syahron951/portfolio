// Canonical chapter list for the voyage. Single source of truth for the nav,
// the progress rail, and page composition.

export interface ChapterMeta {
    id: string;
    roman: string;
    name: string;
    /** short, clear label for the top nav (clarity for skimmers) */
    nav: string;
}

export const chapters: ChapterMeta[] = [
    { id: "ignition", roman: "I", name: "Ignition", nav: "Start" },
    { id: "escape-velocity", roman: "II", name: "Escape Velocity", nav: "Journey" },
    { id: "instruments", roman: "III", name: "Instruments", nav: "Craft" },
    { id: "charted-lights", roman: "IV", name: "Charted Lights", nav: "Work" },
    { id: "frontier", roman: "V", name: "The Frontier", nav: "Vision" },
    { id: "constellation", roman: "VI", name: "The Constellation", nav: "Connect" },
];
