'use server';

import { checkAuth } from '@/actions/auth';
import { createSubjectDirect } from '@/actions/subjects';
import { createProjectTransaction } from '@/actions/projects';
import { createFolderTransaction } from '@/actions/folders';
import { createFileTransaction } from './files';

const subjects = [
    { name: 'Software Development', shortcode: 'SD', description: "Coding and IT-related Projects." },
    { name: 'Food Preparation', shortcode: 'FP', description: "Recipes, ingredient storage standards, and kitchen equipment research Projects." },
    { name: 'Pets', shortcode: 'PT', description: "Veterinary records, care research, and food diary Projects." },
    { name: 'Home Maintenance', shortcode: 'HM', description: "Home repair, DIY, cleaning, and lawncare Projects." },
    { name: 'Dungeons and Dragons', shortcode: 'DND', description: "Campaign log, storyline idea, and character-related Projects." },
    { name: 'YouTube', shortcode: 'YT', description: "Coding tutorial and multimedia Projects." },
];

// const projects = [
//     [
//         { name: "ATLAS", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "GladOS", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "SkyNet", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "HomeAssistant", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "Unraid", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "Kotlin", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//     ],
//     [
//         { name: "Chicken Tikka Massala", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "Produce Storage Guidelines", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "Cast Iron and Carbon Steel Care", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "Wooden Utensil Care", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "Bread Making Research", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "Stir-Frying", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//     ],
//     [
//         { name: "Spot the Cat", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "Rufus the Gecko", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "Nemo the Bearded Lizard", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "Automatic Litter Systems", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "Allergy Friendly Cat Foods", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "Pet Introduction Guidelines and Recommendations", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//     ],
//     [
//         { name: "Cat Friendly Plants", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "Floorplans and Room Designs", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "Warren Tunnel Maintenance", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "Furnace Maintenance", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "Plumbing Well Enough", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "Temporary Fixes", description: "Seriously temporary fixes that may cause anxiety." },
//     ],
//     [
//         { name: "Curse of Strahd Planning", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "Roleplaying Tips", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "Baby's First Campaign DMing", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "Norm the Gnome", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "Caledriel the Human", description: "Elf wannabe." },
//         { name: "Adv Academy Notes", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//     ],
//     [
//         { name: "Swift Introduction", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "NextJS Notebook App Tutorial", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//         { name: "Community Moderation", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
//     ],
// ];

// const files = [
//     [
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Requirements", description: "Use cases and dependency restrictions." }, { name: "Work Log 2026 01 01", description: "Notes from working session." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Cake Recipes", description: "Honest to goodness deliciousness, definitely, for sure." }, { name: "Optimizations", description: "How to be so fast it could even run on a potato?" },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Influential People", description: "[REDACTED]" },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Supported Hardware", description: "HomeAssistant compatible devices." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Hardware", description: "Serial numbers and server equipment information" }, ],
//         [{ name: "Research Overview", description: "Goals for research project." }, { name: "Fundamentals", description: "Notes on language basics." }, { name: "Platform Support", description: "Where can it run?" },]
//     ],
//     [
//         [{ name: "Recipe", description: "" }, { name: "Attempt 1", description: "Notes from first try" }, { name: "Attempt 2", description: "Notes from second try" },],
//         [{ name: "Leafy Greens", description: "" }, { name: "Tomatoes", description: "" }, { name: "Interactions", description: "What helps/hurts what." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },]
//     ],
//     [
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },]
//     ],
//     [
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },]
//     ],
//     [
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },]
//     ],
//     [
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },],
//         [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." }, { name: "Project Overview", description: "High level details about the project." },]
//     ],
// ]

const projects = [
    [
        { name: "ATLAS", description: "A personal note system aimed at supporting neurodivergent users with a private, local-only system." },
        { name: "GladOS", description: "Testing environment for automated lab deployments." },
        { name: "SkyNet", description: "Local network monitoring and ad-blocking infrastructure." },
        { name: "HomeAssistant", description: "Smart home dashboard, device integrations, and automation scripts." },
        { name: "Unraid", description: "NAS configuration, Docker container setups, and storage array management." },
        { name: "Kotlin", description: "Learning sandbox for Android development and JVM languages." },
    ],
    [
        { name: "Chicken Tikka Massala", description: "Perfecting the spice blend and yogurt marinade ratios." },
        { name: "Produce Storage Guidelines", description: "Cheat sheets for maximizing the shelf life of fruits and vegetables." },
        { name: "Cast Iron and Carbon Steel Care", description: "Maintenance routines, rust removal, and seasoning guides." },
        { name: "Wooden Utensil Care", description: "Oiling frequencies and cleaning procedures to prevent cracking." },
        { name: "Bread Making Research", description: "Hydration levels, yeast types, and proofing time experiments." },
        { name: "Stir-Frying", description: "Wok hei techniques, temperature control, and velvetting meat." },
    ],
    [
        { name: "Spot the Cat", description: "Veterinary records, weight tracking, and behavioral notes." },
        { name: "Rufus the Gecko", description: "Tank temperature logs, humidity tracking, and feeding schedule." },
        { name: "Nemo the Bearded Lizard", description: "UVB lighting replacement schedule and diet notes." },
        { name: "Automatic Litter Systems", description: "Comparisons of Litter-Robot vs. competitors and maintenance tracking." },
        { name: "Allergy Friendly Cat Foods", description: "Ingredient analysis for novel proteins and limited ingredient diets." },
        { name: "Pet Introduction Guidelines", description: "Step-by-step scent swapping and visual introduction methods." },
    ],
    [
        { name: "Cat Friendly Plants", description: "Database of ASPCA-approved safe houseplants and toxic plants to avoid." },
        { name: "Floorplans and Room Designs", description: "Measurements, furniture layout ideas, and paint swatches." },
        { name: "Warren Tunnel Maintenance", description: "Structural checks, drainage clearing, and pest control logs." },
        { name: "Furnace Maintenance", description: "Filter replacement schedule, MERV ratings, and troubleshooting." },
        { name: "Plumbing Well Enough", description: "Basic drain clearing, fixture replacement, and shutoff valve locations." },
        { name: "Temporary Fixes", description: "Seriously temporary fixes that may cause anxiety." },
    ],
    [
        { name: "Curse of Strahd Planning", description: "Session prep, NPC motivations, location notes, and maps." },
        { name: "Roleplaying Tips", description: "Voices, character quirks, and improv exercises for the table." },
        { name: "Baby's First Campaign DMing", description: "Encounter balancing, pacing notes, and loot tables." },
        { name: "Norm the Gnome", description: "Character sheet, spell list, and backstory for Norm." },
        { name: "Caledriel the Human", description: "Elf wannabe." },
        { name: "Adv Academy Notes", description: "Lore, faculty lists, and session summaries for the campaign." },
    ],
    [
        { name: "Swift Introduction", description: "Script and screen recording assets for a beginner iOS tutorial." },
        { name: "NextJS Notebook App Tutorial", description: "Code snippets, environment setup, and deployment guide." },
        { name: "Community Moderation", description: "Discord server guidelines, rule drafts, and automod configuration." },
    ],
];

const files = [
    [
        [{ name: "Project Overview", description: "High level details about the project." }, { name: "Project Requirements", description: "Use cases and dependency restrictions." }, { name: "Work Log 2026 01 01", description: "Notes from working session." }],
        [{ name: "Project Overview", description: "High level details about the project." }, { name: "Cake Recipes", description: "Honest to goodness deliciousness, definitely, for sure." }, { name: "Optimizations", description: "How to be so fast it could even run on a potato?" }],
        [{ name: "Project Overview", description: "High level details about the project." }, { name: "Influential People", description: "[REDACTED]" }],
        [{ name: "Project Overview", description: "High level details about the project." }, { name: "Supported Hardware", description: "HomeAssistant compatible devices." }],
        [{ name: "Project Overview", description: "High level details about the project." }, { name: "Hardware", description: "Serial numbers and server equipment information." }],
        [{ name: "Research Overview", description: "Goals for research project." }, { name: "Fundamentals", description: "Notes on language basics." }, { name: "Platform Support", description: "Where can it run?" }]
    ],
    [
        [{ name: "Recipe", description: "Initial recipe outline and ingredient list." }, { name: "Attempt 1", description: "Notes from first try." }, { name: "Attempt 2", description: "Notes from second try." }],
        [{ name: "Leafy Greens", description: "Moisture control and crisper drawer settings." }, { name: "Tomatoes", description: "Countertop vs. fridge debate notes." }, { name: "Interactions", description: "What helps/hurts what (e.g., ethylene gas producers)." }],
        [{ name: "Seasoning Guide", description: "Step-by-step oil application and baking." }, { name: "Rust Removal", description: "Vinegar bath and steel wool instructions." }, { name: "Daily Cleaning", description: "Salt scrub and chainmail scrubber methods." }],
        [{ name: "Mineral Oil Application", description: "Frequency and method for treating boards and spoons." }, { name: "Sanding Guide", description: "Removing rough spots and splinters safely." }],
        [{ name: "Sourdough Starter", description: "Feeding schedule and hydration ratios." }, { name: "Flour Types", description: "Protein content comparison for different bakes." }, { name: "Kneading Techniques", description: "The windowpane test and slap-and-fold method." }],
        [{ name: "Velveting Meat", description: "Baking soda and cornstarch marinade techniques." }, { name: "Sauce Ratios", description: "Classic stir-fry sauce components and thickeners." }]
    ],
    [
        [{ name: "Vet Records 2025", description: "Vaccination history and checkup summaries." }, { name: "Diet Changes", description: "Transitioning schedule to new wet food." }],
        [{ name: "Temperature Log", description: "Basking spot and cool zone tracking." }, { name: "Cricket Feeding", description: "Gut-loading schedule and dusting routine." }],
        [{ name: "Shedding Issues", description: "Humidity adjustments and bath techniques." }, { name: "Calcium Supplements", description: "Dosing guidelines and schedules." }],
        [{ name: "Litter-Robot 4 Review", description: "Pros, cons, and personal thoughts." }, { name: "Deep Cleaning", description: "Disassembly and sensor wiping instructions." }],
        [{ name: "Hydrolyzed Protein", description: "Veterinary prescription diet options." }, { name: "Novel Proteins", description: "Rabbit, venison, and duck ingredient lists." }],
        [{ name: "Scent Swapping", description: "Towel exchange schedule and reactions." }, { name: "Supervised Visits", description: "Body language to watch for and intervention steps." }]
    ],
    [
        [{ name: "Safe List", description: "ASPCA-approved plants currently owned." }, { name: "Toxic List", description: "Plants to avoid bringing into the house completely." }],
        [{ name: "Living Room", description: "Couch placement options and TV mounting heights." }, { name: "Office", description: "Desk, cable management, and shelving layout." }],
        [{ name: "Inspection Log", description: "Monthly structural check results." }, { name: "Drainage", description: "Water flow management after heavy rain." }],
        [{ name: "Filter Sizes", description: "MERV ratings, dimensions, and purchase links." }, { name: "Troubleshooting", description: "Common error codes and reset procedures." }],
        [{ name: "P-Trap Cleaning", description: "Sink drainage fixes and tools needed." }, { name: "Toilet Flapper", description: "Replacement steps and water shutoff guide." }],
        [{ name: "Duct Tape Log", description: "Where it's currently holding things together." }, { name: "The Leaning Tower of Boxes", description: "Do not touch under any circumstances." }]
    ],
    [
        [{ name: "Vallaki Politics", description: "Faction relationships and key NPCs." }, { name: "Castle Ravenloft", description: "Map notes, trap locations, and loot." }, { name: "Tarokka Deck", description: "Reading results and item locations." }],
        [{ name: "Accents", description: "Dialect practice notes and phonetic spellings." }, { name: "Mannerisms", description: "Physical quirks to act out at the table." }],
        [{ name: "Session 1 Prep", description: "The tavern meeting and initial hook." }, { name: "Loot Tables", description: "Level-appropriate rewards and magic items." }],
        [{ name: "Backstory", description: "Why he left the burrow." }, { name: "Spell List", description: "Illusion and utility focus." }],
        [{ name: "Journal Entries", description: "Her perspective on the party's antics." }, { name: "Elvish Vocabulary", description: "Phrases she constantly misuses." }],
        [{ name: "Teachers", description: "Faculty list and their respective subjects." }, { name: "Rival Party", description: "Stats and motivations for the jerk squad." }]
    ],
    [
        [{ name: "Script Draft", description: "Initial talking points and code walkthrough." }, { name: "B-Roll", description: "Screen recording timestamps and zoom markers." }],
        [{ name: "Repository Link", description: "GitHub URL and branch structure." }, { name: "Environment Setup", description: ".env variables and database initialization." }],
        [{ name: "Rules Draft", description: "Discord server rules and onboarding flow." }, { name: "Automod Regex", description: "Spam filtering patterns and blocked words." }]
    ]
];

export async function loadDemonstrationData() {
    const { userId, session } = await checkAuth();

    for (let i = 0; i < subjects.length; i++) {
        const returnedSubject = await createSubjectDirect(subjects[i].name, subjects[i].shortcode, subjects[i].description);

        if (returnedSubject.data) {
            for (let j = 0; j < projects[i].length; j++) {
                const returnedProject = await createProjectTransaction(returnedSubject.data.id, projects[i][j].name, projects[i][j].description);

                if (returnedProject) {
                    for (let k = 0; k < files[i][j].length; k++) {
                        await createFileTransaction(returnedProject.id, files[i][j][k].name, files[i][j][k].description);
                    }
                }
            }
        }
    }
}