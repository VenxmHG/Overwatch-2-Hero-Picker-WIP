// Array of hero objects with properties: name, score, original score, and image file path
const heroes = [
    { name: 'Reaper', score: 85, originalScore: 85, image: 'reaper-portrait-small.png', category: 'DPS' },
    { name: 'Doomfist', score: 85, originalScore: 85, image: 'doomfist-portrait-small.png', category: 'Tank' },
    { name: 'Moira', score: 85, originalScore: 85, image: 'moira-portrait-small.png', category: 'Support' },
    { name: 'Sigma', score: 85, originalScore: 85, image: 'sigma-portrait-small.png', category: 'Tank' },
    { name: 'Reinhardt', score: 85, originalScore: 85, image: 'reinhardt-portrait-small.png', category: 'Tank' },
    { name: 'Zarya', score: 75, originalScore: 75, image: 'zarya-portrait-small.png', category: 'Tank' },
    { name: 'D.VA', score: 85, originalScore: 85, image: 'dva-portrait-small.png', category: 'Tank' },
    { name: 'Mei', score: 85, originalScore: 85, image: 'mei-portrait-small.png', category: 'DPS' },
    { name: 'Ana', score: 95, originalScore: 95, image: 'ana-portrait-small.png', category: 'Support' },
    { name: 'Orisa', score: 95, originalScore: 95, image: 'orisa-portrait-small.png', category: 'Tank' },
    { name: 'Lucio', score: 85, originalScore: 85, image: 'lucio-portrait-small.png', category: 'Support' },
    { name: 'Cassidy', score: 85, originalScore: 85, image: 'mccree-portrait-small.png', category: 'DPS' },
    { name: 'Genji', score: 85, originalScore: 85, image: 'genji-portrait-small.png', category: 'DPS' },
    { name: 'Junkrat', score: 85, originalScore: 85, image: 'junkrat-portrait-small.png', category: 'DPS' },
    { name: 'Pharah', score: 85, originalScore: 85, image: 'pharah-portrait-small.png', category: 'DPS' },
    { name: 'Roadhog', score: 85, originalScore: 85, image: 'roadhog-portrait-small.png', category: 'Tank' },
    { name: 'Widowmaker', score: 95, originalScore: 95, image: 'widowmaker-portrait-small.png', category: 'DPS' },
    { name: 'Winston', score: 85, originalScore: 85, image: 'winston-portrait-small.png', category: 'Tank' },
    { name: 'Hanzo', score: 75, originalScore: 75, image: 'hanzo-portrait-small.png', category: 'DPS' },
    { name: 'Tracer', score: 85, originalScore: 85, image: 'tracer-portrait-small.png', category: 'DPS' },
    { name: 'Torbjorn', score: 85, originalScore: 85, image: 'torbjorn-portrait-small.png', category: 'DPS' },
    { name: 'Zenyatta', score: 85, originalScore: 85, image: 'zenyatta-portrait-small.png', category: 'Support' },
    { name: 'Sombra', score: 55, originalScore: 55, image: 'sombra-portrait-small.png', category: 'DPS' },
    { name: 'Wrecking Ball', score: 85, originalScore: 85, image: 'wreckingball-portrait-small.png', category: 'Tank' },
    { name: 'Mercy', score: 75, originalScore: 75, image: 'mercy-portrait-small.png', category: 'Support' },
    { name: 'Soldier: 76', score: 85, originalScore: 85, image: 'soldier76-portrait-small.png', category: 'DPS' },
    { name: 'Brigitte', score: 95, originalScore: 95, image: 'brigitte-portrait-small.png', category: 'Support' },
    { name: 'Ashe', score: 85, originalScore: 85, image: 'ashe-portrait-small.png', category: 'DPS' },
    { name: 'Baptiste', score: 85, originalScore: 85, image: 'baptiste-portrait-small.png', category: 'Support' },
    { name: 'Symmetra', score: 85, originalScore: 85, image: 'symmetra-portrait-small.png', category: 'DPS' },
    { name: 'Bastion', score: 75, originalScore: 75, image: 'bastion-portrait-small.png', category: 'DPS' },
    { name: 'Echo', score: 85, originalScore: 85, image: 'echo-portrait-small.png', category: 'DPS' },
    { name: 'Illari', score: 85, originalScore: 85, image: 'illari-portrait-small.png', category: 'Support' },
    { name: 'Junker Queen', score: 85, originalScore: 85, image: 'junker-queen-portrait-small.png', category: 'Tank' },
    { name: 'Kiriko', score: 85, originalScore: 85, image: 'kiriko-portrait-small.png', category: 'Support' },
    { name: 'Lifeweaver', score: 65, originalScore: 65, image: 'lifeweaver-portrait-small.png', category: 'Support' },
    { name: 'Mauga', score: 85, originalScore: 85, image: 'mauga-portrait-small.png', category: 'Tank' },
    { name: 'Ramattra', score: 85, originalScore: 85, image: 'ramattra-portrait-small.png', category: 'Tank' },
    { name: 'Sojourn', score: 95, originalScore: 95, image: 'sojourn-portrait-small.png', category: 'DPS' },
    { name: 'Venture', score: 85, originalScore: 85, image: 'venture-portrait-small.png', category: 'DPS' },
    { name: 'Juno', score: 95, originalScore: 95, image: 'juno-portrait-small.png', category: 'Support' },
    { name: 'Hazard', score: 95, originalScore: 95, image: 'hazard-portrait-small.png', category: 'Tank' }
];

// Object defining which heroes counter others, where each hero is mapped to an array of heroes they counter
const counters = {
    'Ana': ['Bastion', 'Doomfist', 'Hazard', 'Junker Queen', 'Mauga', 'Ramattra', 'Roadhog', 'Torbjorn', 'Venture', 'Wrecking Ball'],
    'Ashe': ['Bastion', 'Brigitte', 'Cassidy', 'Echo', 'Hazard', 'Junker Queen', 'Junkrat', 'Juno', 'Lifeweaver', 'Orisa', 'Pharah', 'Soldier: 76', 'Torbjorn', 'Zarya'], // Juno countered by range
    'Baptiste': ['Junkrat', 'Pharah', 'Torbjorn', 'Tracer'],
    'Bastion': ['Brigitte', 'Moira', 'Ramattra', 'Reinhardt', 'Winston', 'Wrecking Ball', 'Zarya'],
    'Brigitte': ['Doomfist', 'D.VA', 'Hazard', 'Tracer', 'Winston', 'Wrecking Ball'],
    'Cassidy': ['Doomfist', 'Echo', 'Hazard', 'Lucio', 'Moira', 'Pharah', 'Reaper', 'Sombra', 'Torbjorn', 'Venture', 'Winston', 'Wrecking Ball'],
    'Doomfist': ['Ashe', 'Baptiste', 'Hazard', 'Juno', 'Symmetra', 'Venture', 'Widowmaker'], // Countered by Juno's disruption/peel?
    'D.VA': ['Ana', 'Ashe', 'Bastion', 'Cassidy', 'Doomfist', 'Echo', 'Hanzo', 'Hazard', 'Illari', 'Junkrat', 'Juno', 'Kiriko', 'Mauga', 'Mercy', 'Pharah', 'Reaper', 'Roadhog', 
            'Sombra', 'Torbjorn', 'Tracer'],
    'Echo': ['Bastion', 'Brigitte', 'Doomfist', 'Genji', 'Hazard', 'Junkrat', 'Lifeweaver', 'Orisa', 'Pharah', 'Ramattra', 'Reaper', 'Sigma', 'Torbjorn', 'Venture', 'Winston', 'Zarya'],
    'Genji': ['Ashe', 'Bastion', 'Hanzo', 'Hazard', 'Juno', 'Widowmaker'], // Counters Juno dive potential
    'Hanzo': ['Ashe', 'Bastion', 'Cassidy', 'Hazard', 'Junkrat', 'Junker Queen', 'Juno', 'Lifeweaver', 'Moira', 'Orisa', 'Reaper', 'Roadhog', 'Sojourn', 'Soldier: 76', 'Symmetra', 
            'Torbjorn', 'Widowmaker', 'Zarya'],
    'Hazard' : ['Bastion', 'Junker Queen', 'Ramattra', 'Reinhardt', 'Torbjorn', 'Zenyatta'], // Corrected: Removed Ana, Ashe, Orisa, Sigma, Widowmaker
    'Illari': ['Echo', 'Lifeweaver', 'Pharah', 'Torbjorn', 'Tracer', 'Zarya'],
    'Junkrat': ['Brigitte', 'Reaper', 'Venture'],
    'Junker Queen': ['Winston'],
    // Juno counters immobile heroes, enables dive vs certain comps (Sigma/Bap/Illari), provides speed/disruption
    'Juno': ['Ana', 'Bastion', 'Baptiste', 'Illari', 'Lifeweaver', 'Reinhardt', 'Roadhog', 'Sigma', 'Symmetra', 'Zenyatta'], 
    'Kiriko': ['Ashe', 'Doomfist', 'Junker Queen', 'Mei', 'Orisa', 'Reaper', 'Reinhardt', 'Sigma', 'Sombra', 'Torbjorn', 'Tracer', 'Widowmaker', 'Zarya'],
    'Lifeweaver': ['Ramattra', 'Reaper', 'Reinhardt', 'Zarya'],
    'Lucio': ['Genji', 'Junker Queen', 'Mei', 'Reaper', 'Tracer', 'Widowmaker'],
    'Mauga': ['Bastion', 'Doomfist', 'Mauga', 'Ramattra', 'Roadhog', 'Torbjorn', 'Winston', 'Zarya'],
    'Mei': ['D.VA', 'Genji', 'Hazard', 'Junker Queen', 'Torbjorn', 'Wrecking Ball', 'Zarya'],
    'Mercy': ['Ramattra'],
    'Moira': ['Genji'],
    'Orisa': ['Bastion', 'Hazard', 'Mauga', 'Pharah', 'Reaper', 'Reinhardt', 'Roadhog', 'Torbjorn', 'Widowmaker'],
    'Pharah': ['Brigitte', 'Doomfist', 'Genji', 'Hanzo', 'Hazard', 'Junker Queen', 'Junkrat', 'Lifeweaver', 'Mei', 'Orisa', 'Ramattra', 'Reaper', 'Reinhardt', 
            'Symmetra', 'Torbjorn', 'Zenyatta'],
    'Ramattra': ['Brigitte', 'Lucio', 'Sigma', 'Torbjorn', 'Zarya'],
    'Reaper': ['Junker Queen', 'Mauga', 'Pharah', 'Winston'],
    'Reinhardt': ['Brigitte', 'Junker Queen', 'Pharah', 'Sigma', 'Widowmaker', 'Zarya'],
    'Roadhog': ['Bastion', 'Doomfist', 'Hazard', 'Moira', 'Reinhardt', 'Winston', 'Wrecking Ball'],
    'Sigma': ['Ashe', 'Bastion', 'Cassidy', 'Hanzo', 'Hazard', 'Illari', 'Junkrat', 'Orisa', 'Reaper', 'Roadhog', 'Soldier: 76', 'Torbjorn'],
    'Sojourn': ['Bastion', 'Cassidy', 'Echo', 'Hazard', 'Juno', 'Orisa', 'Pharah', 'Ramattra', 'Roadhog', 'Soldier: 76', 'Torbjorn', 'Zarya'],
    'Soldier: 76': ['Echo', 'Hazard', 'Juno', 'Junker Queen', 'Pharah', 'Sigma', 'Torbjorn'],
    'Sombra': ['Ana', 'Ashe', 'Bastion', 'Doomfist', 'Echo', 'Hazard', 'Juno', 'Lucio', 'Mauga', 'Mercy', 'Pharah', 'Sigma', 'Soldier: 76', 'Symmetra', 'Widowmaker', 'Wrecking Ball', 'Zenyatta'], // Counters Juno hard
    'Symmetra': ['Mauga', 'Sigma', 'Torbjorn'],
    'Torbjorn': ['Genji', 'Moira', 'Reaper', 'Sombra', 'Tracer', 'Winston'],
    'Tracer': ['Ana', 'Ashe', 'Doomfist', 'Hazard', 'Juno', 'Mercy', 'Pharah', 'Ramattra', 'Sigma', 'Soldier: 76', 'Sombra', 'Torbjorn', 
        'Widowmaker', 'Zenyatta'],
    'Venture': ['Doomfist', 'Genji', 'Hanzo', 'Pharah', 'Sombra'],
    'Widowmaker': ['Ana', 'Ashe', 'Cassidy', 'Hanzo', 'Hazard', 'Illari', 'Junker Queen', 'Junkrat', 'Juno', 'Lifeweaver', 'Mauga', 'Orisa', 'Pharah', 'Sojourn', 
                'Soldier: 76', 'Torbjorn', 'Widowmaker', 'Zarya'],
    'Winston': ['Hazard', 'Juno', 'Mercy', 'Pharah', 'Symmetra', 'Widowmaker', 'Zarya'], // Counters Juno dive potential
    'Wrecking Ball': ['Ashe', 'Baptiste', 'Hazard', 'Illari', 'Kiriko', 'Mercy', 'Moira', 'Pharah', 'Soldier: 76', 'Symmetra', 'Widowmaker', 'Zarya'], // Counters Juno dive potential
    'Zarya': ['D.VA', 'Genji', 'Hazard', 'Junker Queen', 'Junkrat', 'Orisa'],
    'Zenyatta': ['Bastion', 'Doomfist', 'Junker Queen', 'Orisa', 'Ramattra', 'Roadhog', 'Torbjorn', 'Winston', 'Wrecking Ball']
};

// Maps object with map data and hero adjustments
const maps = [
    { 
        name: 'Antarctic Peninsula Icebreaker', 
        image: 'Antarctic_Peninsula.png',
        category: 'Control',
        counters: {
            'Mauga': 15,       // Strong brawl tank for tight control point
            'Reinhardt': 15,   // Excellent for shielding team in enclosed space
            'Zarya': 15,       // Bubbles extremely effective in tight quarters
            'Winston': 0,      // Limited vertical options, tight spaces reduce effectiveness
            'D.VA': 5,         // Limited vertical advantage, Defense Matrix useful in chokes
            'Pharah': -15,     // Severely limited by extremely low ceilings in enclosed ship
            'Widowmaker': -10, // Very limited sightlines in enclosed ship
            'Genji': -5,       // Limited vertical mobility options, tight spaces constrain dash
            'Hanzo': 0,        // Limited sightlines but can work in corridors
            'Tracer': 15,      // Excellent in close-quarters ship corridors 
            'Reaper': 20,      // Dominates in extremely close-quarters environment
            'Mei': 15,         // Wall extremely effective in narrow corridors
            'Junkrat': 15,     // Excellent for spam in tight corridors
            'Lucio': 5,        // Wall-riding severely limited but speed boost valuable
            'Moira': 15,       // Orbs extremely effective in enclosed spaces
            'Brigitte': 15,    // Shield bash excellent in tight corridors
            'Kiriko': 5,       // Teleport useful but very predictable paths
            'Ana': 0,          // Limited sightlines but good for anti-nade
            'Baptiste': 5,     // Immortality Field excellent but jumps limited by ceiling
            'Zenyatta': -5,    // Too vulnerable in enclosed spaces
            'Juno': 15,        // Excels here. Glide for rotation/escape, Torpedoes/Ray strong in corridors. High HPS valuable.
            'Hazard': 15,      // Jagged Wall dominates narrow corridors, Violent Leap for engagement/disruption
            'Wrecking Ball': -15, // Severely limited roll space in tight environment
            'Junker Queen': 15, // Excellent for close-quarters brawling
            'Orisa': 10,       // Good for javelin in corridors but limited space
            'Roadhog': 15,     // Hook extremely effective in corridors
            'Sigma': 0,        // Medium range effectiveness significantly reduced in tight spaces
            'Ramattra': 15,    // Nemesis form dominates in tight corridors
            'Ashe': -5,        // Dynamite effective but coach gun limited by ceiling
            'Echo': -15,       // Flight severely limited by low ceilings
            'Sojourn': 0,      // Powerslide useful but limited sightlines
            'Cassidy': 15,     // Flash extremely effective in tight spaces
            'Soldier: 76': 0,  // Helix rockets effective but limited room
            'Sombra': 5,       // Hack valuable but translocator placement limited
            'Symmetra': 15,    // Turrets extremely effective in tight corridors
            'Torbjorn': 15,    // Turret highly effective in choke points
            'Bastion': 10,     // Good sentry positions in limited entrances
            'Mercy': -5,       // Guardian Angel severely limited by low ceilings
            'Illari': -10,     // Very limited sightlines for solar rifle
            'Lifeweaver': 0,   // Petal platform severely limited by low ceilings
            'Venture': 10     // Burrow effective in enclosed spaces for flanking; point has good excavator angles
        }
    },
    { 
        name: 'Antarctic Peninsula Labs', 
        image: 'Antarctic_Peninsula.png',
        category: 'Control',
        counters: {
            'Mauga': 10,       // Strong in hydroponics lab with good shield coverage for team
            'Reinhardt': 10,   // Shield very effective in enclosed lab spaces, protects team from crossfire
            'Zarya': 15,       // Bubbles extremely valuable in labs with many angles of attack
            'Winston': 15,     // Excellent mobility between lab rooms and greenhouse sections
            'D.VA': 15,        // Defense Matrix blocks damage through glass walls, good vertical mobility
            'Pharah': -5,      // Limited ceiling height in most lab sections restricts effectiveness
            'Widowmaker': 10,  // Good sightlines through glass walls and lab windows
            'Genji': 10,       // Dash useful for quick navigation between lab sections
            'Hanzo': 10,       // Wall climb valuable for accessing research platforms, good angles
            'Tracer': 15,      // Excellent for navigating through multiple lab pathways
            'Reaper': 15,      // Shadow Step excellent for ambushing through lab corridors
            'Mei': 15,         // Wall can completely block critical lab doorways and corridors
            'Junkrat': 15,     // Traps highly effective in narrow lab entrances, spam through windows
            'Lucio': 10,       // Wall-riding on lab equipment and walls, speed boost through corridors
            'Moira': 15,       // Orbs extremely effective in enclosed lab spaces with parallel walls
            'Brigitte': 10,    // Shield bash effective in narrow corridors, Rally armor valuable
            'Kiriko': 15,      // Teleport through lab walls provides unique flanking opportunities
            'Ana': 10,         // Sleep dart valuable in lab corridors, good sightlines through windows
            'Baptiste': 10,    // Immortality Field extremely valuable in labs with limited escape routes
            'Zenyatta': -5,    // Vulnerable in lab corridors but discord valuable through glass walls
            'Juno': 15,        // Strong. Can use geometry for verticality, speed useful, Torpedoes/Ray good in labs.
            'Hazard': 10,      // Jagged Wall effective in corridors, Leap useful between sections, glass limits wall use
            'Wrecking Ball': 5, // Limited ceiling height restricts full potential, but good for disruption
            'Junker Queen': 10, // Strong in close-quarters lab engagements
            'Orisa': 5,        // Javelin Spin effective in lab corridors but limited by ceiling height
            'Roadhog': 10,     // Hook through lab doorways and windows highly effective
            'Sigma': 15,       // Accretion bounces effectively in lab corridors, barrier blocks key sightlines
            'Ramattra': 10,    // Nemesis form dominates in enclosed lab spaces
            'Ashe': 5,         // Dynamite effective in lab rooms but Coach Gun limited by ceiling height
            'Echo': -5,        // Flight potential severely limited by lab ceiling height
            'Sojourn': 10,     // Powerslide effective through lab corridors, Disruptor Shot valuable
            'Cassidy': 15,     // Flashbang extremely effective in confined lab spaces
            'Soldier: 76': 5,  // Helix Rockets effective but limited high ground options
            'Sombra': 15,      // Hack on key health packs in labs, excellent flank routes through walls
            'Symmetra': 20,    // Turrets extremely effective at lab entrances, teleporter for team repositioning
            'Torbjorn': 15,    // Turret coverage excellent in lab with multiple angles
            'Bastion': 5,      // Configuration: Assault mode effective but limited sightlines
            'Mercy': 10,       // Guardian Angel between lab sections, damage boost through windows
            'Illari': 5,       // Solar Rifle effective through windows but limited vertical mobility
            'Lifeweaver': 10,  // Petal Platform provides unique high ground in labs with limited verticality 
            'Venture': 15      // Burrow allows navigation through lab walls for surprise attacks
        }
    },
    { 
        name: 'Antarctic Peninsula Sublevel', 
        image: 'Antarctic_Peninsula.png',
        category: 'Control',
        counters: {
            'Mauga': 15,        // Strong in underground tunnels and drilling chamber
            'Reinhardt': 15,     // Shield valuable in tunnel engagements
            'Zarya': 15,         // Bubbles extremely effective in tight underground tunnels
            'Winston': 0,        // Jump useful but limited ceiling height
            'D.VA': 0,           // Defense Matrix useful but limited vertical space
            'Pharah': -20,       // Completely ineffective in underground tunnels with low ceilings
            'Widowmaker': -15,   // No effective long sightlines in underground setting
            'Genji': -5,         // Dash limited by tunnel layout, severely restricted vertical play
            'Hanzo': 0,          // Storm arrows effective in tunnels but limited sightlines
            'Tracer': 15,        // Excellent for navigating underground tunnel networks
            'Reaper': 20,        // Dominates in close-quarters underground environment
            'Mei': 20,           // Wall extremely effective for cutting off tunnel routes
            'Junkrat': 20,       // Exceptional for trap and mine placement in tunnels
            'Lucio': 5,          // Speed boost valuable but wall-riding very limited by ceiling
            'Moira': 20,         // Orbs devastatingly effective in tunnel corridors
            'Brigitte': 15,      // Shield bash excellent in narrow tunnel engagements
            'Kiriko': 0,         // Teleport useful but severely limited by ceiling height
            'Ana': -5,           // Very limited sightlines in underground tunnels
            'Baptiste': 0,       // Immortality Field useful but jumping severely limited by ceiling
            'Zenyatta': -10,     // Extremely vulnerable in confined tunnels with limited escape
            'Juno': 20,          // Excellent. Narrow tunnels amplify Torpedo/Ray value, Glide essential for survival/rotation.
            'Hazard': 20,        // Jagged Wall extremely strong in tunnels, Leap for engagement/disruption
            'Wrecking Ball': -15, // Roll mechanics severely limited by narrow tunnels and low ceilings
            'Junker Queen': 15,  // Excellent for close-quarters combat in tunnels
            'Orisa': 5,          // Javelin useful in tunnels but limited by ceiling height
            'Roadhog': 20,       // Hook devastatingly effective in tunnel engagements
            'Sigma': 0,          // Medium range effectiveness limited in tight tunnels
            'Ramattra': 20,      // Nemesis form dominates in underground tunnels
            'Ashe': -10,         // Coach gun limited by ceiling, dynamite bounce unpredictable
            'Echo': -20,         // Flight completely nullified by underground ceilings
            'Sojourn': 0,        // Powerslide effective in tunnels but limited vertical play
            'Cassidy': 15,       // Flash extremely effective in tight underground spaces
            'Soldier: 76': 0,    // Helix rockets effective but sprint paths limited
            'Sombra': 5,         // Hack valuable but translocator limited by ceiling height
            'Symmetra': 20,      // Turrets devastatingly effective in tunnel entrances
            'Torbjorn': 20,      // Turret dominates in underground chambers
            'Bastion': 15,       // Excellent sentry positions covering tunnel approaches
            'Mercy': -15,        // Guardian Angel severely limited by underground ceilings
            'Illari': -15,       // Solar rifle almost completely ineffective with limited sightlines
            'Lifeweaver': -5,    // Petal platform severely limited by low ceilings
            'Venture': 20     // Underground tunnels perfectly complement burrowing abilities
        }
    },
    { 
        name: 'Busan Downtown', 
        image: 'Busan.png',
        category: 'Control',
        counters: {
            'Mauga': -10,      // Struggles with high ground control and open sightlines
            'Reinhardt': -10,  // Very limited shield value against multiple high grounds
            'Zarya': 0,        // Bubbles help team cross open areas but limited vertical mobility
            'Winston': 20,     // Exceptional for contesting multiple high grounds and buildings
            'D.VA': 20,        // Outstanding mobility between high grounds and buildings
            'Pharah': 20,      // Excellent vertical play between buildings and over point
            'Widowmaker': 20,  // Exceptional sightlines from multiple high ground positions
            'Genji': 20,       // Outstanding mobility between buildings and levels
            'Hanzo': 15,       // Great sightlines from high grounds
            'Tracer': 15,      // Excellent flank routes through urban environment
            'Reaper': -5,      // Effective in buildings but very exposed crossing point
            'Mei': 0,          // Wall useful at choke points but limited on point
            'Junkrat': 10,     // Good spam from high grounds and through doorways
            'Lucio': 15,       // Excellent wall-riding opportunities on buildings
            'Moira': -5,       // Orbs useful in corridors but limited range in open areas
            'Brigitte': -5,    // Shield effective in corridors but vulnerable on point
            'Kiriko': 15,      // Teleport excellent for accessing high grounds
            'Ana': 15,         // Strong sightlines from elevation
            'Baptiste': 15,    // Excellent exo-boots value for accessing high grounds
            'Zenyatta': -15,   // Extremely vulnerable with limited escape routes
            'Juno': 0,         // Struggles. Open map, many flank routes, vulnerable to snipers/dive. Glide usage risky.
            'Hazard': 5,       // Leap useful for verticality, wall good for point chokes, but vulnerable to snipers
            'Wrecking Ball': 15, // Good mobility between levels and rooms
            'Junker Queen': -10, // Very limited vertical mobility against high ground positions
            'Orisa': -10,      // Severely limited mobility to contest high grounds
            'Roadhog': -5,     // Hook opportunities but vulnerable to multiple angles
            'Sigma': 5,        // Medium-range effectiveness but struggles against multiple high grounds
            'Ramattra': -10,   // Limited mobility to contest high grounds
            'Ashe': 20,        // Coach gun excellent for mobility, outstanding sightlines
            'Echo': 20,        // Exceptional vertical mobility between buildings
            'Sojourn': 20,     // Powerslide extremely effective for repositioning, rail dominates
            'Cassidy': 5,      // Limited vertical mobility but Flash useful in corridors
            'Soldier: 76': 15, // Sprint useful for repositioning, excellent high ground options
            'Sombra': 15,      // Translocator valuable for accessing high grounds
            'Symmetra': 0,     // Turrets effective at choke points but limited on point
            'Torbjorn': 0,     // Turret effective at chokepoints but vulnerable from high ground
            'Bastion': -10,    // Too exposed to multiple angles and high ground
            'Mercy': 15,       // Guardian Angel excellent between buildings and levels
            'Illari': 15,      // Excellent sightlines from high ground positions
            'Lifeweaver': 15,  // Petal platform provides valuable high ground access
            'Venture': 5      // Open spaces make burrow approaches predictable; vulnerable at range
        }
    },
    { 
        name: 'Busan MEKA Base', 
        image: 'Busan.png',
        category: 'Control',
        counters: {
            'Mauga': 10,       // Effective in confined spaces but vulnerable in central area
            'Reinhardt': 10,   // Shield useful in corridors but limited on open point
            'Zarya': 15,       // Bubbles very effective in doorways and choke points
            'Winston': 5,      // Mobility somewhat useful but limited by indoor ceilings
            'D.VA': 5,         // Good mobility but limited by facility ceiling
            'Pharah': -15,     // Severely limited by low ceilings in indoor facility
            'Widowmaker': -10, // Very limited sightlines through facility, vulnerable in tight spaces
            'Genji': 0,        // Mobility restricted by facility layout
            'Hanzo': 0,        // Limited sightlines but can work in corridors
            'Tracer': 15,      // Excellent for navigating through MEKA facility
            'Reaper': 20,      // Dominates in close quarters around point and corridors
            'Mei': 15,         // Wall very effective for splitting teams at choke points
            'Junkrat': 20,     // Exceptional for trap/mine placement and spam in facility
            'Lucio': 5,        // Wall-riding opportunities limited but speed boost valuable
            'Moira': 20,       // Orbs devastatingly effective in facility corridors
            'Brigitte': 15,    // Shield bash effective in facility corridors
            'Kiriko': 5,       // Teleport useful but limited ceiling height
            'Ana': -5,         // Very limited sightlines through facility
            'Baptiste': 0,     // Limited ceiling height constrains jump advantage
            'Zenyatta': -10,   // Limited escape routes in tight corridors
            'Juno': 10,        // Decent. Glide useful for rotation, Torpedoes/Ray good in facility, but vulnerable to flanks.
            'Hazard': 15,      // Jagged Wall excellent for corridor control, Leap useful for point engage/disengage
            'Wrecking Ball': -15, // Mobility severely limited by facility layout and low ceilings
            'Junker Queen': 15, // Strong in close-quarters facility environment
            'Orisa': 15,       // Javelin effective in corridors and doorways
            'Roadhog': 20,     // Hook extremely effective in facility corridors
            'Sigma': 5,        // Medium range effectiveness works in facility chambers
            'Ramattra': 15,    // Form switching valuable in different facility areas
            'Ashe': -10,       // Coach gun limited by ceiling, dynamite bounce limited
            'Echo': -20,       // Flight severely limited by facility ceiling
            'Sojourn': 5,      // Powerslide effective through facility layout
            'Cassidy': 15,     // Flash extremely effective in facility corridors
            'Soldier: 76': 0,  // Sprint useful but limited high ground options
            'Sombra': 10,      // Hack valuable for health pack control in facility
            'Symmetra': 20,    // Turrets extremely effective in facility doorways
            'Torbjorn': 20,    // Turret highly effective covering facility corridors
            'Bastion': 10,     // Good setups but vulnerable to flanks
            'Mercy': -10,      // Guardian Angel severely limited by facility layout
            'Illari': -15,     // Very limited sightlines in facility
            'Lifeweaver': 0,   // Petal platform limited by ceiling height
            'Venture': 15     // Indoor facility provides good flanking routes for burrow
        }
    },
    { 
        name: 'Busan Sanctuary', 
        image: 'Busan.png',
        category: 'Control',
        counters: {
            'Mauga': 15,        // Strong on the central point with good close-range damage
            'Reinhardt': 15,    // Shield very effective for controlling central drum area
            'Zarya': 15,        // Bubbles effective in temple corridors and on point
            'Winston': 5,       // Mobility useful but limited by temple architecture
            'D.VA': 5,          // Mobility useful but limited by temple architecture
            'Pharah': -10,      // Limited ceiling height in temple areas
            'Widowmaker': -10,  // Very limited sightlines through temple structures
            'Genji': 5,         // Mobility somewhat limited by temple layout
            'Hanzo': 0,         // Some angles but limited by temple structures
            'Tracer': 10,       // Good flank routes through temple side rooms
            'Reaper': 20,       // Dominates in close quarters around drum
            'Mei': 15,          // Wall very effective for splitting teams at temple entrances
            'Junkrat': 15,      // Good trap/mine placement around drum and side corridors
            'Lucio': 10,        // Wall-riding opportunities on temple structures
            'Moira': 15,        // Orbs extremely effective in temple corridors
            'Brigitte': 15,     // Shield bash effective in close quarters around drum
            'Kiriko': 10,       // Teleport useful through temple walls
            'Ana': 0,           // Limited positions by temple structures
            'Baptiste': 0,      // Exo-boots limited by ceiling height
            'Zenyatta': -15,    // Extremely vulnerable with limited escape options
            'Juno': 10,         // Decent. Close quarters good for Torpedoes/Ray, but limited space for Glide maneuvering.
            'Hazard': 15,       // Jagged Wall excellent for controlling drum point and corridors, Leap for engage
            'Wrecking Ball': 0, // Mobility limited by temple structure
            'Junker Queen': 15, // Strong brawl potential around drum
            'Orisa': 15,        // Javelin and fortify valuable for point control
            'Roadhog': 15,      // Hook effective in temple corridors
            'Sigma': 10,        // Medium range effectiveness good for temple layout
            'Ramattra': 15,     // Form switching valuable in temple environment
            'Ashe': -10,        // Coach gun useful but temple severely limits sightlines
            'Echo': -15,        // Flight severely limited by temple roof
            'Sojourn': 0,       // Powerslide effective but sightlines limited
            'Cassidy': 15,      // Flash extremely effective around drum
            'Soldier: 76': 0,   // Sprint useful but limited high ground options
            'Sombra': 5,        // Hack valuable but translocator locations limited
            'Symmetra': 15,     // Turrets effective in temple doorways
            'Torbjorn': 15,     // Turret highly effective covering drum
            'Bastion': -10,     // Very limited sightlines, vulnerable to flanks
            'Mercy': -5,        // Guardian Angel limited by temple layout
            'Illari': -10,      // Limited sightlines in temple
            'Lifeweaver': 0,    // Petal platform useful but limited by ceiling height
            'Venture': 10     // Temple corridors offer good burrow opportunities but central drum is exposed
        }
    },
    {
        name: 'Ilios Lighthouse', 
        image: 'Ilios.png',
        category: 'Control',
        counters: {
            'Mauga': 10,      // Strong brawl potential on enclosed point, vulnerable to high ground spam
            'Reinhardt': 10,  // Effective shield on point but vulnerable to flanks/high ground
            'Zarya': 15,      // Bubbles valuable in close quarters, Graviton Surge strong on point
            'Winston': 15,    // Excellent mobility to contest point and high ground surrounding it
            'D.VA': 15,       // High mobility to contest point and surrounding buildings
            'Pharah': 15,     // Good vertical control over point, concussion blast for boops
            'Widowmaker': -5, // Limited long sightlines, vulnerable to dives
            'Genji': 15,      // Excellent mobility to navigate buildings and flank
            'Hanzo': 5,       // Some angles from high ground but limited sightlines onto point
            'Tracer': 15,     // Excellent for flanking through buildings and contesting point
            'Reaper': 15,     // Strong in close quarters around the lighthouse point
            'Mei': 15,        // Wall very effective for blocking entrances to the point
            'Junkrat': 15,    // Excellent spam into point area, traps effective in doorways
            'Lucio': 15,      // Wall-riding opportunities, speed boost valuable, boop potential
            'Moira': 10,      // Orbs effective in enclosed point, good survivability
            'Brigitte': 15,   // Strong brawl capability on point, whip shot for boops
            'Kiriko': 15,     // Excellent mobility to access high ground and point
            'Ana': 5,         // Some good sightlines from high ground but vulnerable
            'Baptiste': 15,   // Exo-boots provide good high ground access, IF valuable
            'Zenyatta': -10,  // Very vulnerable to dives in this enclosed/multi-angle map
            'Juno': 5,        // Okay. Can use buildings for cover/verticality, but point is exposed. Glide usage key.
            'Hazard': 10,     // Jagged Wall strong on point/chokes, Leap for vertical/engage, boop potential
            'Wrecking Ball': 15, // Good mobility to disrupt point and contest high ground
            'Junker Queen': 10, // Strong brawl on point, but limited vertical presence
            'Orisa': 5,       // Javelin spin/throw have boop potential, but vulnerable to high ground
            'Roadhog': 10,    // Hook effective around corners and point entrances
            'Sigma': 5,       // Barrier/grasp useful but struggles with verticality
            'Ramattra': 10,   // Nemesis form strong on point, but limited range otherwise
            'Ashe': 10,       // Dynamite good for enclosed point, coach gun for mobility
            'Echo': 15,       // Excellent vertical mobility for high ground control
            'Sojourn': 10,    // Powerslide useful for navigation, railgun good from high ground
            'Cassidy': 10,    // Strong in close quarters but limited mobility
            'Soldier: 76': 10, // Can utilize high ground but less effective than flyers/divers
            'Sombra': 10,     // Good flank routes through buildings, hack valuable
            'Symmetra': 10,   // Turrets strong in enclosed point/doorways, TP useful
            'Torbjorn': 10,   // Turret can lock down angles onto the point
            'Bastion': 5,     // Can lock down point but very vulnerable to flanks/dives
            'Mercy': 10,      // Good mobility with flyers/divers
            'Illari': 10,     // Pylon placement options, some sightlines from high ground
            'Lifeweaver': 15, // Petal platform provides crucial high ground access
            'Venture': 15     // Excellent for flanking with Burrow around lighthouse, Drill Dash useful for environmental kills near edges
        }
    },
    {
        name: 'Ilios Well',
        image: 'Ilios.png',
        category: 'Control',
        counters: {
            'Mauga': -15,     // Very vulnerable to boops near the well, limited mobility
            'Reinhardt': -10, // Charge risky near well, very susceptible to boops
            'Zarya': 5,       // Bubbles prevent boops, but limited independent mobility
            'Winston': 10,    // Good mobility avoids well, can dive key targets
            'D.VA': 15,       // Excellent mobility avoids well, good for contesting space
            'Pharah': 20,     // Premier boop potential, stays safely above the well
            'Widowmaker': 10, // Good sightlines across the map
            'Genji': 10,      // High mobility avoids well, good for diving backline
            'Hanzo': 10,      // Good sightlines, wall climb helps positioning
            'Tracer': 10,     // High mobility avoids well, recall is safety net
            'Reaper': -5,     // Can reach positions but vulnerable during Wraith near well
            'Mei': 10,        // Wall can block boops or secure kills near well, Cryo-freeze safety
            'Junkrat': 20,    // Mine jumps avoid well, excellent boop potential with mines
            'Lucio': 25,      // THE Well boop hero, wall-riding provides safety
            'Moira': -5,      // Fade useful but offers limited protection from boops
            'Brigitte': 15,   // Whip Shot excellent for boops, shield bash mobility
            'Kiriko': 15,     // Swift Step provides excellent safety from well
            'Ana': 10,        // Good sightlines but vulnerable to boops/dives
            'Baptiste': 10,   // Exo-boots provide safety and positioning
            'Zenyatta': -20,  // Extremely vulnerable to boops, no mobility
            'Juno': -5,       // Struggles. Open map, vulnerable to boops and snipers. Glide is main survival tool.
            'Hazard': 15,     // Jagged Wall push excellent for boops near well, Leap less useful
            'Roadhog': 25,    // Premier Hook environmental kill potential
            'Orisa': 25,      // Javelin Throw/Spin premier boop potential, Fortify resists boops
            'Wrecking Ball': 20, // Premier boop potential with Roll/Piledriver
            'Junker Queen': -5, // Shout helps team survive boops, but personally vulnerable
            'Sigma': 10,      // Accretion boops, Grasp absorbs projectiles, float helps positioning
            'Ramattra': -10,  // Vulnerable to boops, limited mobility
            'Ashe': 15,       // Coach Gun provides boop potential and self-peel
            'Echo': 15,       // High mobility avoids well easily
            'Sojourn': 10,    // Powerslide provides safety crossing gaps
            'Cassidy': 0,     // Limited mobility makes him vulnerable near well
            'Soldier: 76': 5, // Sprint helps positioning but still vulnerable
            'Sombra': 15,     // Translocator is excellent safety net from well
            'Symmetra': -15,  // Very vulnerable near well, TP setup slow
            'Torbjorn': -10,  // Turret useful but hero is vulnerable to boops
            'Bastion': -15,   // Very vulnerable to boops, low mobility
            'Mercy': 15,      // Guardian Angel excellent for avoiding well
            'Illari': 5,      // Outburst provides some mobility, good sightlines
            'Lifeweaver': 15, // Petal Platform saves allies, Rejuvenating Dash mobility
            'Venture': 25     // Exceptional Drill Dash boop potential, Burrow provides safety/repositioning
        }
    },
    { 
        name: 'Ilios Ruins',
        image: 'Ilios.png',
        category: 'Control',
        counters: {
            'Mauga': -15,     // Struggles significantly in open sightlines
            'Reinhardt': -15, // Shield offers limited value in such an open space
            'Zarya': -10,     // Bubbles have less impact, vulnerable in the open
            'Winston': 15,    // Excellent mobility to dive key targets across open space
            'D.VA': 15,       // Excellent mobility and DM value against spam/snipers
            'Pharah': 20,     // Dominates the open skies, minimal cover for enemies
            'Widowmaker': 25, // Premier sniper map with extremely long sightlines
            'Genji': 15,      // High mobility allows flanking across the open map
            'Hanzo': 25,      // Excellent sightlines, wall climb accesses key positions
            'Tracer': 15,     // Can effectively flank and harass in the open space
            'Reaper': -20,    // Extremely vulnerable in the open, teleport predictable
            'Mei': -15,       // Wall has limited value, vulnerable at range
            'Junkrat': -10,   // Spam less effective, vulnerable in the open
            'Lucio': 0,       // Speed useful but limited wall ride surfaces
            'Moira': -15,     // Struggles to get value at range, vulnerable
            'Brigitte': -20,  // Very vulnerable in open sightlines
            'Kiriko': 15,     // Mobility is key for survival and positioning
            'Ana': 25,        // Excellent long-range healing and damage potential
            'Baptiste': 15,   // High ground control with Exo-boots, IF valuable
            'Zenyatta': 0,    // Discord valuable but extremely vulnerable to snipers/dives
            'Juno': -15,      // Very Weak. Extremely open, prime sniper map, hard to use Glide safely.
            'Hazard': -5,     // Very vulnerable to snipers/range, wall offers limited protection, leap predictable
            'Wrecking Ball': 20, // High mobility excels in this open environment
            'Junker Queen': -15, // Struggles significantly with range and lack of cover
            'Orisa': -5,      // Can pressure from range but limited mobility
            'Roadhog': -10,   // Very vulnerable at range, hook less reliable
            'Sigma': 10,      // Can control space from range but vulnerable to flanks
            'Ramattra': -15,  // Struggles significantly with open sightlines
            'Ashe': 20,       // Excellent range and dynamite control
            'Echo': 20,       // Dominates vertical space, good burst damage
            'Sojourn': 20,    // Excellent mobility and railgun effectiveness at range
            'Cassidy': -5,    // Struggles with range, limited mobility
            'Soldier: 76': 15, // Consistent damage at range, sprint for positioning
            'Sombra': 10,     // Can flank effectively but hack less impactful on snipers
            'Symmetra': -15,  // Struggles significantly in open space
            'Torbjorn': -5,   // Turret vulnerable, hero struggles at range
            'Bastion': -10,   // Very vulnerable in the open, limited good positions
            'Mercy': 15,      // Excellent mobility supporting flyers/divers
            'Illari': 15,     // Excellent sightlines for healing/damage
            'Lifeweaver': 15, // Petal Platform provides valuable high ground/cover
            'Venture': 10     // Burrow useful for crossing open space, but vulnerable when attacking
        }
    },
    { 
        name: 'Lijiang Tower Night Market', 
        image: 'Lijiang_Tower.png',
        category: 'Control',
        counters: {
            'Mauga': 15,      // Good for brawl on point
            'Reinhardt': 15,  // Good for brawl on point
            'Zarya': 15,      // Good for brawl on point
            'Winston': 10,    // Good for diving
            'D.VA': 10,       // Good for diving
            'Pharah': 15,     // Good for environmental kills
            'Widowmaker': 5,  // Limited sightlines on point
            'Genji': 10,      // Good for flanking
            'Hanzo': 5,       // Limited sightlines on point
            'Tracer': 15,     // Good for flanking
            'Reaper': 15,     // Good for close quarters
            'Mei': 15,        // Good for point control
            'Junkrat': 15,    // Good for area denial
            'Lucio': 20,      // Excellent for environmental kills
            'Moira': 15,      // Good for healing in close quarters
            'Brigitte': 15,   // Good for close quarters
            'Kiriko': 10,     // Good mobility
            'Ana': 5,         // Limited sightlines on point
            'Baptiste': 5,    // Limited sightlines on point
            'Zenyatta': -10,  // Too vulnerable in close quarters
            'Juno': 15,       // Good for circuit overload on point
            'Hazard': 15,     // Strong wall control on point/chokes, good boop potential
            'Venture': 20     // Exceptional for burrowing onto point undetected and Drill Dash for environmental kills around the central point
        }
    },
    { 
        name: 'Lijiang Tower Garden', 
        image: 'Lijiang_Tower.png',
        category: 'Control',
        counters: {
            'Mauga': 15,      // Good for brawl on point
            'Reinhardt': 15,  // Good for brawl on point
            'Zarya': 15,      // Good for brawl on point
            'Winston': 10,    // Good for diving
            'D.VA': 10,       // Good for diving
            'Pharah': 15,     // Good for environmental kills
            'Widowmaker': 5,  // Limited sightlines
            'Genji': 10,      // Good for flanking
            'Hanzo': 5,       // Limited sightlines
            'Tracer': 15,     // Good for flanking
            'Reaper': 15,     // Good for close quarters
            'Mei': 15,        // Good for point control
            'Junkrat': 15,    // Good for area denial
            'Lucio': 20,      // Excellent for environmental kills
            'Moira': 15,      // Good for healing in close quarters
            'Brigitte': 15,   // Good for close quarters
            'Kiriko': 10,     // Good mobility
            'Ana': 5,         // Limited sightlines
            'Baptiste': 5,    // Limited sightlines
            'Zenyatta': -10,  // Too vulnerable in close quarters
            'Juno': 15,       // Good for circuit overload on point
            'Hazard': 15,     // Wall strong on bridge/point, good boop potential off edges
            'Venture': 20     // Excellent for burrowing onto point and flanking, Drill Dash effective for environmental kills around edges of point
        }
    },
    { 
        name: 'Lijiang Tower Control Center', 
        image: 'Lijiang_Tower.png',
        category: 'Control',
        counters: {
            'Mauga': 10,      // Good for brawl on point, but open area limits effectiveness
            'Reinhardt': 10,  // Good for brawl on point, but less valuable around edges
            'Zarya': 15,      // Good for brawl and bubbling teammates near environmental hazards
            'Winston': 15,    // Good for jumping between central point and surrounding areas
            'D.VA': 15,       // Good for contesting both point and surrounding areas
            'Pharah': 20,     // Excellent for environmental kills and vertical control
            'Widowmaker': 15, // Good sightlines from multiple angles
            'Genji': 15,      // Good for flanking and vertical mobility
            'Hanzo': 15,      // Good sightlines from elevated positions
            'Tracer': 15,     // Good for flanking around the garden
            'Reaper': 10,     // Good for close quarters on point, but vulnerable in open areas
            'Mei': 15,        // Good for wall plays near environmental hazards
            'Junkrat': 15,    // Good for area denial on point and bouncing enemies off edges
            'Lucio': 25,      // Exceptional for environmental kills from all sides
            'Moira': 10,      // Good for healing on point, less effective in open areas
            'Brigitte': 10,   // Good for close quarters on point, shield bash for environmental kills
            'Kiriko': 15,     // Good for teleporting between levels
            'Ana': 10,        // Good sightlines from various positions
            'Baptiste': 10,   // Good for supporting on point, jump boots for mobility
            'Zenyatta': -5,   // Vulnerable to flanks and environmental hazards
            'Juno': 0,        // Weak. Very open point, many flank angles, vulnerable to dive/snipers.
            'Hazard': 10,     // Wall useful for point control, boop potential off edges, Leap OK for vertical
            'Venture': 20     // Excellent for burrowing across garden and Drill Dash for environmental kills
        }
    },
    { 
        name: 'Nepal Village', 
        image: 'Nepal.png',
        category: 'Control',
        counters: {
            'Mauga': -10,     // Too many high grounds
            'Reinhardt': -10, // Too many high grounds
            'Zarya': 10,      // Good for brawl
            'Winston': 10,    // Good high ground access
            'D.VA': 10,       // Good high ground access
            'Pharah': 10,     // Good vertical space
            'Widowmaker': 10, // Good sightlines
            'Genji': 10,      // Good high ground access
            'Hanzo': 10,      // Good sightlines
            'Tracer': 10,     // Good flank routes
            'Reaper': -10,    // Too many high grounds
            'Mei': -10,       // Too many high grounds
            'Junkrat': 10,    // Good for area denial
            'Lucio': 10,      // Good for speed boost
            'Moira': -10,     // Too many high grounds
            'Brigitte': -10,  // Too many high grounds
            'Kiriko': 10,     // Good vertical mobility
            'Ana': 10,        // Good sightlines
            'Baptiste': 10,   // Good high ground access
            'Zenyatta': -10,  // Too exposed
            'Juno': 5,        // Okay. Can abuse high ground/verticality, but point is open. Needs careful positioning.
            'Hazard': 5,      // Wall useful for chokes/point, Leap for high ground, but many angles to cover
            'Wrecking Ball': 10, // Good mobility map
            'Junker Queen': -10, // Too spread out
            'Orisa': -10,     // Too spread out
            'Roadhog': -10,   // Too much high ground
            'Sigma': -10,     // Too spread out
            'Ramattra': -10,  // Too spread out
            'Ashe': 10,       // Good sightlines
            'Echo': 10,       // Good vertical mobility
            'Sojourn': 10,    // Good high ground access
            'Cassidy': 10,    // Good sightlines
            'Soldier: 76': 10, // Good high ground usage
            'Sombra': 10,     // Good health pack control
            'Symmetra': -10,  // Too exposed
            'Torbjorn': -10,  // Too spread out
            'Bastion': -10,   // Too exposed
            'Mercy': 10,      // Good vertical mobility
            'Illari': 10,     // Good sightlines
            'Lifeweaver': 10, // Good high ground access
            'Venture': 15     // Good tunneling routes around the point, effective for surprise attacks
        }
    },
    { 
        name: 'Nepal Shrine', 
        image: 'Nepal.png',
        category: 'Control',
        counters: {
            'Mauga': -10,     // Too many high grounds
            'Reinhardt': -10, // Too many high grounds
            'Zarya': 10,      // Good for brawl
            'Winston': 10,    // Good high ground access
            'D.VA': 10,       // Good high ground access
            'Pharah': 10,     // Good vertical space
            'Widowmaker': 10, // Good sightlines
            'Genji': 10,      // Good high ground access
            'Hanzo': 10,      // Good sightlines
            'Tracer': 10,     // Good flank routes
            'Reaper': -10,    // Too many high grounds
            'Mei': -10,       // Too many high grounds
            'Junkrat': 10,    // Good for area denial
            'Lucio': 10,      // Good for speed boost
            'Moira': -10,     // Too many high grounds
            'Brigitte': -10,  // Too many high grounds
            'Kiriko': 10,     // Good vertical mobility
            'Ana': 10,        // Good sightlines
            'Baptiste': 10,   // Good high ground access
            'Zenyatta': -10,  // Too exposed
            'Juno': 5,        // Okay. Similar to Village, high ground play is key, but center is dangerous.
            'Hazard': 5,      // Wall good on point, boop potential, Leap ok, but vulnerable in center
            'Wrecking Ball': 10, // Good for boops, mobility helps prevent falls
            'Roadhog': 10,    // Good for hook environmental kills
            'Orisa': 10,      // Good for javelin environmental kills
            'Junker Queen': -5, // Commanding Shout helps survive boops, but limited vertical mobility
            'Sigma': 10,      // Rock can push enemies off, barrier blocks boops
            'Ramattra': -5,   // Form switching grants some resistance, but poor vertical mobility
            'Ashe': 15,       // Coach gun for self-peel and environmental kills
            'Echo': 15,       // Excellent vertical mobility
            'Sojourn': 10,    // Powerslide allows crossing gaps safely
            'Cassidy': 5,     // Combat roll has limited mobility, but can reach some high ground
            'Soldier: 76': 10, // Sprint helps position, helix jumps for vertical mobility
            'Sombra': 10,     // Translocator prevents falling deaths
            'Symmetra': -15,  // Too exposed, teleporter on cooldown
            'Torbjorn': -10,  // Poor mobility, turret easily destroyed from range
            'Bastion': -15,   // Too exposed, poor mobility near pit
            'Mercy': 10,      // Guardian Angel prevents falls
            'Illari': 5,      // Good sightlines, solar beam pushes enemies
            'Lifeweaver': 10, // Petal platform prevents falls, provides high ground
            'Venture': 10     // Central shrine offers good drill dash opportunities, but exposed when emerging
        }
    },
    { 
        name: 'Nepal Sanctum', 
        image: 'Nepal.png',
        category: 'Control',
        counters: {
            'Mauga': -10,     // Too many high grounds, vulnerable near pit
            'Reinhardt': -10, // Too many high grounds, can be booped
            'Zarya': 10,      // Good for brawl, bubble prevents boops
            'Winston': 10,    // Good high ground access
            'D.VA': 10,       // Good high ground access, boosters prevent falls
            'Pharah': 20,     // Excellent for environmental knockbacks
            'Widowmaker': 10, // Good sightlines
            'Genji': 10,      // Good high ground access
            'Hanzo': 10,      // Good sightlines
            'Tracer': 10,     // Good flank routes
            'Reaper': -10,    // Too many high grounds, vulnerable near pit
            'Mei': 10,        // Wall can block environmental kills, ice block immune to boops
            'Junkrat': 20,    // Excellent for mine environmental kills
            'Lucio': 20,      // Excellent for environmental kills
            'Moira': -10,     // Too many high grounds, no vertical mobility
            'Brigitte': 10,   // Shield bash provides mobility, whip shot for environmental kills
            'Kiriko': 10,     // Good vertical mobility with teleport
            'Ana': 10,        // Good sightlines, sleep dart disrupts around pit
            'Baptiste': 10,   // Good high ground access
            'Zenyatta': -20,  // Too exposed, no mobility near pit
            'Juno': 10,       // Decent. Close quarters point benefits Torpedoes/Ray. Glide crucial for survival.
            'Hazard': 15,     // Wall excellent for point control and boops into pit
            'Wrecking Ball': 15, // Good for boops, mobility helps prevent falls
            'Roadhog': 15,    // Good for hook environmental kills
            'Orisa': 15,      // Good for javelin environmental kills
            'Junker Queen': -5, // Commanding Shout helps survive boops, but limited vertical mobility
            'Sigma': 10,      // Rock can push enemies off, barrier blocks boops
            'Ramattra': -5,   // Form switching grants some resistance, but poor vertical mobility
            'Ashe': 15,       // Coach gun for self-peel and environmental kills
            'Echo': 15,       // Excellent vertical mobility
            'Sojourn': 10,    // Powerslide allows crossing gaps safely
            'Cassidy': 5,     // Combat roll has limited mobility, but can reach some high ground
            'Soldier: 76': 10, // Sprint helps position, helix jumps for vertical mobility
            'Sombra': 10,     // Translocator prevents falling deaths
            'Symmetra': -15,  // Too exposed, teleporter on cooldown
            'Torbjorn': -10,  // Poor mobility, turret easily destroyed from range
            'Bastion': -15,   // Too exposed, poor mobility near pit
            'Mercy': 10,      // Guardian Angel prevents falls
            'Illari': 5,      // Good sightlines, solar beam pushes enemies
            'Lifeweaver': 10, // Petal platform prevents falls, provides high ground
            'Venture': 20     // Great for flanking and drill dashing enemies into the well
        }
    },
    { 
        name: 'Oasis City Center',   
        image: 'Oasis.png',
        category: 'Control',
        counters: {
            'Mauga': 10,       // Effective on central point with good shield coverage for team
            'Reinhardt': 15,   // Shield very effective for controlling central point with jump pad
            'Zarya': 15,       // Bubbles protect teammates using jump pad, excellent for point control
            'Winston': 5,      // Jump combines with jump pad for mobility, but limited ceiling height
            'D.VA': 5,         // Defense Matrix valuable but limited high ground advantage
            'Pharah': -10,     // Indoor ceiling severely limits aerial advantage
            'Widowmaker': -5,  // Limited long sightlines but some angles from sides
            'Genji': 0,        // Dash combines with jump pad, but tight spaces restrict movement
            'Hanzo': 0,        // Limited sightlines but storm arrows effective in close quarters
            'Tracer': 15,      // Excellent for navigating around central point with jump pad
            'Reaper': 20,      // Dominates in close-quarters around central point
            'Mei': 15,         // Wall extremely effective for splitting teams at jump pad
            'Junkrat': 15,     // Traps on jump pad extremely effective, excellent spam
            'Lucio': 15,       // Wall-riding opportunities on central structure, speed boost valuable
            'Moira': 15,       // Orbs extremely effective in confined central area
            'Brigitte': 15,    // Shield bash excellent for jump pad interception
            'Kiriko': 10,      // Teleport somewhat redundant with jump pad, but still useful
            'Ana': 0,          // Limited sightlines but anti-nade effective on grouped enemies
            'Baptiste': 5,     // Immortality Field valuable on point, jumps less unique with jump pad
            'Zenyatta': -5,    // Vulnerable due to predictable jump pad movement
            'Juno': 15,        // Strong. Close quarters, jump pad aids rotation, Ray/Torpedoes very effective.
            'Hazard': 15,      // Wall strong for point control/splitting jump pad users, Leap for engage
            'Wrecking Ball': 15, // Jump pad extends mobility options and adds unpredictability
            'Junker Queen': 15,  // Strong brawl potential on central point
            'Orisa': 15,       // Javelin effective for environmental kills near jump pad
            'Roadhog': 15,     // Hook devastatingly effective against jump pad users
            'Sigma': 10,       // Shield and rock effective around jump pad
            'Ramattra': 15,    // Nemesis form dominates in confined central area
            'Ashe': 0,         // Coach gun somewhat redundant with jump pad
            'Echo': -15,       // Flight severely limited by indoor ceiling
            'Sojourn': 10,     // Powerslide effective through central area
            'Cassidy': 15,     // Flash extremely effective against jump pad users
            'Soldier: 76': 5,  // Sprint helps with positioning but limited high ground
            'Sombra': 15,      // Hack on jump pad is extremely disruptive
            'Symmetra': 20,    // Turrets devastatingly effective around jump pad
            'Torbjorn': 15,    // Turret dominates covering jump pad and point
            'Bastion': 5,      // Good sentry positions but vulnerable to multiple angles
            'Mercy': -5,       // Guardian Angel somewhat redundant with jump pad
            'Illari': -5,      // Limited long sightlines for solar rifle
            'Lifeweaver': 5,   // Petal platform somewhat redundant with jump pad
            'Venture': 15      // Burrow excellent for surprising enemies using jump pad, underground approach unpredictable
        }
    },
    { 
        name: 'Oasis Gardens',   
        image: 'Oasis.png',
        category: 'Control',
        counters: {
            'Mauga': -10,      // Too exposed in open garden areas with multiple sightlines
            'Reinhardt': -5,   // Shield less effective due to multiple approach angles 
            'Zarya': 5,        // Bubbles help crossing exposed areas but limited by open space
            'Winston': 20,     // Excellent for accessing multiple levels and high ground
            'D.VA': 20,        // Outstanding mobility between different levels of gardens
            'Pharah': 20,      // Exceptional vertical space and minimal cover from above
            'Widowmaker': 20,  // Excellent sightlines across gardens with minimal barriers
            'Genji': 15,       // Great mobility between garden levels
            'Hanzo': 15,       // Strong sightlines from elevated positions
            'Tracer': 15,      // Good flank routes through garden paths
            'Reaper': -5,      // Effective in enclosed areas but exposed crossing open spaces
            'Mei': 0,          // Wall useful at choke points but limited effectiveness in open areas
            'Junkrat': 5,      // Some spam opportunities but limited by open spaces
            'Lucio': 10,       // Good wall-riding opportunities on garden structures
            'Moira': -5,       // Orbs less effective in open garden areas
            'Brigitte': -10,   // Shield less effective in open areas with multiple angles
            'Kiriko': 15,      // Teleport excellent for accessing different garden levels
            'Ana': 15,         // Great sightlines from elevated positions
            'Baptiste': 15,    // Excellent exo-boots value for accessing multiple levels
            'Zenyatta': -5,    // Vulnerable but discord orb valuable through sightlines
            'Juno': 0,         // Weak. Very open, vulnerable to snipers/dive. Glide usage is high risk.
            'Hazard': 0,       // Leap useful for levels, wall situational, vulnerable to range/snipers
            'Wrecking Ball': 20, // Exceptional mobility across multi-level garden environment
            'Junker Queen': -5,  // Limited vertical mobility to contest high grounds
            'Orisa': -5,       // Limited mobility to contest multiple garden levels
            'Roadhog': 0,      // Hook opportunities but exposed to multiple angles
            'Sigma': 5,        // Medium range effectiveness but struggles with vertical elements
            'Ramattra': -5,    // Limited mobility to contest garden high grounds
            'Ashe': 15,        // Coach gun excellent for mobility between levels
            'Echo': 20,        // Exceptional vertical mobility in open garden area
            'Sojourn': 15,     // Powerslide extremely effective for repositioning
            'Cassidy': 5,      // Limited vertical mobility but effective in enclosed areas
            'Soldier: 76': 15, // Sprint useful for repositioning, good high ground options
            'Sombra': 15,      // Translocator valuable for accessing all garden levels
            'Symmetra': 0,     // Turrets effective at choke points but limited in open areas
            'Torbjorn': 0,     // Turret effective but vulnerable to multiple angles
            'Bastion': -10,    // Too exposed to multiple angles in open garden setting
            'Mercy': 15,       // Guardian Angel excellent between various garden structures
            'Illari': 15,      // Excellent sightlines from elevated garden positions
            'Lifeweaver': 15,  // Petal platform provides valuable access to high ground
            'Venture': 15      // Burrow paths provide excellent mobility throughout garden, able to ambush from unexpected angles
        }
    },
    { 
        name: 'Oasis University',   
        image: 'Oasis.png',
        category: 'Control',
        counters: {
            'Mauga': -5,       // Jump pad provides some mobility, but vulnerable during ascent
            'Reinhardt': 0,    // Jump pad disrupts shield protection, but enclosed point area
            'Zarya': 10,       // Bubbles protect teammates using jump pad
            'Winston': 15,     // Jump combined with jump pad creates exceptional mobility
            'D.VA': 15,        // Defense Matrix protects teammates using jump pad
            'Pharah': 10,      // Some vertical space but library ceiling limits full potential
            'Widowmaker': 10,  // Good sightlines from upper areas covering jump pad
            'Genji': 15,       // Dash reset potential with jump pad kills
            'Hanzo': 10,       // Good angles from elevated positions
            'Tracer': 15,      // Excellent for flanking with jump pad access
            'Reaper': 5,       // Jump pad helps mobility but predictable during ascent
            'Mei': 10,         // Wall can split teams at jump pad or block it entirely
            'Junkrat': 20,     // Trap on jump pad extremely effective, mines for environmental kills
            'Lucio': 15,       // Wall-riding opportunities on library structures
            'Moira': 5,        // Orbs effective in corridors but fade limited by jump pad predictability
            'Brigitte': 0,     // Shield bash effective for jump pad interception but limited mobility
            'Kiriko': 15,      // Teleport excellent for accessing upper library areas
            'Ana': 10,         // Sleep dart devastatingly effective against jump pad users
            'Baptiste': 15,    // Exo-boots combines well with jump pad for extreme height
            'Zenyatta': -10,   // Extremely vulnerable on predictable jump pad trajectory
            'Juno': 15,        // Strong. Jump pad aids rotation, enclosed spaces good for abilities, high ground access.
            'Hazard': 15,      // Wall excellent for controlling point/jump pad, Leap uses jump pad well
            'Wrecking Ball': 20, // Jump pad extends already excellent mobility
            'Junker Queen': 5,  // Command shout valuable for team using jump pad
            'Orisa': 10,       // Javelin effective for jump pad interception
            'Roadhog': 15,     // Hook devastatingly effective against jump pad users
            'Sigma': 10,       // Rock effective against jump pad users, barrier blocks sightlines
            'Ramattra': 0,     // Form switching valuable but limited mobility to contest high ground
            'Ashe': 15,        // Coach gun combines with jump pad for extreme height
            'Echo': 15,        // Flight provides alternative to jump pad
            'Sojourn': 15,     // Powerslide effective with jump pad for rapid repositioning
            'Cassidy': 10,     // Flash effective against jump pad users
            'Soldier: 76': 10, // Helix rockets combine with jump pad for extra height
            'Sombra': 20,      // Hack on jump pad is extremely disruptive
            'Symmetra': 15,    // Turrets extremely effective around jump pad
            'Torbjorn': 15,    // Turret highly effective covering jump pad
            'Bastion': 0,      // Some good setups but vulnerable to multiple angles
            'Mercy': 15,       // Guardian Angel combined with jump pad for exceptional mobility
            'Illari': 10,      // Good sightlines from upper areas
            'Lifeweaver': 15,  // Petal platform provides alternative to jump pad
            'Venture': 15      // Burrow allows bypassing jump pad entirely for surprise attacks
        }
    },
    { 
        name: 'Samoa Beach', 
        image: 'Samoa.png',
        category: 'Control',
        counters: {
            'Mauga': 10,       // Strong on capture point with limited escape routes, good for controlling the close-range fights
            'Reinhardt': 5,     // Effective on capture point but limited mobility on the beach areas
            'Zarya': 10,        // Bubbles very effective with the choke points near the point
            'Winston': 5,       // Mobility useful but limited value from Tesla Cannon in open areas
            'D.VA': 15,         // Excellent mobility across map and Defense Matrix for projectiles
            'Pharah': 20,       // Exceptional vertical space with minimal cover from above
            'Widowmaker': 15,   // Long sightlines across beach with minimal shields to block
            'Genji': 10,        // Good flanking routes but limited value against grouped enemies
            'Hanzo': 15,        // Strong sightlines and Sonic Arrow valuable for detecting flanks
            'Tracer': 15,       // Excellent for harassing backline and contesting point
            'Reaper': 5,        // Strong on point but vulnerable crossing open areas
            'Mei': 5,           // Wall useful for splitting teams, but open spaces limit effectiveness
            'Junkrat': 15,      // Excellent for area denial and spam damage in choke points
            'Lucio': 20,        // Environmental kill potential near water and speed boost value
            'Moira': 0,         // Decent healing but limited vertical mobility
            'Brigitte': 0,      // Shield useful in close quarters but struggles in open areas
            'Kiriko': 15,       // Teleport excellent for positioning and escape
            'Ana': 10,          // Good sightlines for healing and anti-nade
            'Baptiste': 10,     // Exo-boots provide mobility, Immortality Field valuable on point
            'Zenyatta': -10,    // Too vulnerable in open areas with limited escape
            'Juno': 0,          // Weak. Very open, long sightlines favor snipers, Glide usage risky.
            'Hazard': -5,       // Vulnerable to long sightlines, wall has few chokes, boop potential near water
            'Wrecking Ball': 15, // Great mobility and displacing enemies near water
            'Junker Queen': 5,   // Good for point control but limited vertical mobility
            'Orisa': 5,         // Javelin effective near water, but limited vertical mobility
            'Roadhog': 15,      // Hook extremely valuable near water for environmental kills
            'Sigma': 10,        // Floating passive helps with terrain, Accretion useful near edges
            'Ramattra': 0,      // Strong on point but struggles with vertical elements
            'Ashe': 15,         // Coach gun for mobility, dynamite effective on grouped enemies
            'Echo': 20,         // Exceptional mobility and damage across the open areas
            'Sojourn': 10,      // Powerslide effective for repositioning, rail effective at range
            'Cassidy': 5,       // Flash useful on point but limited vertical mobility
            'Soldier: 76': 5,    // Sprint useful but somewhat limited by vertical elements
            'Sombra': 10,       // Translocator valuable for accessing all areas of the map
            'Symmetra': 0,      // Turrets can be effective at chokes but exposed in open areas
            'Torbjorn': 0,      // Turret effective at chokepoints but vulnerable from multiple angles
            'Bastion': -5,      // Limited mobility and too exposed in Sentry configuration
            'Mercy': 15,        // Guardian Angel excellent for mobility across the map
            'Illari': 10,       // Good sightlines and healing pylon placement options
            'Lifeweaver': 10,   // Petal platform adds valuable vertical mobility
            'Venture': 15       // Excellent mobility and grapple points across the map
        }
    },
    { 
        name: 'Samoa Downtown', 
        image: 'Samoa.png',
        category: 'Control',
        counters: {
            'Mauga': 15,       // Strong for controlling the point with tight corridors
            'Reinhardt': 15,    // Very effective for shielding team in urban environment
            'Zarya': 15,        // Bubbles extremely effective in corridor fights
            'Winston': 5,       // Good for accessing high ground but limited value in tight spaces
            'D.VA': 10,         // Good mobility but Defense Matrix more situational here
            'Pharah': 5,        // Limited vertical space with many roof overhangs
            'Widowmaker': 5,    // Some good sightlines but limited by buildings and cover
            'Genji': 5,         // Good for flanking but limited escape routes
            'Hanzo': 10,        // Good for corridor fights and Sonic Arrow valuable
            'Tracer': 10,       // Excellent for flanking but tight spaces can be dangerous
            'Reaper': 15,       // Excellent in close quarters urban environment
            'Mei': 20,          // Wall extremely effective for splitting teams in tight spaces
            'Junkrat': 20,      // Exceptional for corridor spam and trap placement
            'Lucio': 15,        // Wall-riding effective through urban environment
            'Moira': 15,        // Orbs very effective in corridors and enclosed spaces
            'Brigitte': 15,     // Shield bash and flail excellent in tight spaces
            'Kiriko': 10,       // Teleport useful but more predictable paths
            'Ana': 5,           // Limited sightlines through urban environment
            'Baptiste': 10,     // Immortality Field valuable in tight spaces
            'Zenyatta': 0,      // Limited escape routes but discord valuable
            'Juno': 15,         // Strong area control in tight spaces
            'Hazard': 15,       // Excellent in urban environment with walls for Jagged Wall placement, Leap for engage
            'Wrecking Ball': 0, // Limited roll space and many obstacles
            'Junker Queen': 15, // Excellent for close-quarters brawling
            'Orisa': 10,        // Javelin useful for corridor fights
            'Roadhog': 10,      // Hook effective in corridors but fewer environmental kills
            'Sigma': 15,        // Shield and abilities excellent in corridor fights
            'Ramattra': 15,     // Nemesis form dominates in tight spaces
            'Ashe': 5,          // Coach gun useful but dynamite limited by corridors
            'Echo': 0,          // Limited vertical space restricts mobility advantage
            'Sojourn': 10,      // Powerslide effective through corridors
            'Cassidy': 15,      // Flashbang excellent in tight spaces
            'Soldier: 76': 5,   // Sprint useful but Biotic Field limited by movement
            'Sombra': 5,        // Hack valuable but translocator placement more predictable
            'Symmetra': 15,     // Turrets excellent in tight corridors
            'Torbjorn': 15,     // Turret highly effective covering corridors
            'Bastion': 5,       // Some good setups but still vulnerable
            'Mercy': 5,         // Limited Guardian Angel targets in urban environment
            'Illari': 5,        // Limited sightlines for solar rifle
            'Lifeweaver': 10,   // Life Grip valuable for team repositioning
            'Venture': 5        // Limited grapple points in urban environment
        }
    },
    { 
        name: 'Samoa Volcano', 
        image: 'Samoa.png',
        category: 'Control',
        counters: {
            'Mauga': 0,        // Limited effectiveness on multi-level volcanic terrain
            'Reinhardt': -5,    // Shield less effective on uneven terrain with height variation
            'Zarya': 5,         // Bubbles help but limited by vertical elements
            'Winston': 20,      // Exceptional mobility across volcanic heights
            'D.VA': 20,         // Excellent mobility across all volcano levels
            'Pharah': 20,       // Exceptional vertical space around volcano
            'Widowmaker': 15,   // Excellent sightlines from volcano heights
            'Genji': 15,        // Excellent mobility across volcanic terrain
            'Hanzo': 15,        // Strong sightlines from high ground positions
            'Tracer': 10,       // Good for harassing but limited by vertical elements
            'Reaper': 0,        // Teleport helps with height but exposed on open areas
            'Mei': 0,           // Wall has situational value on uneven terrain
            'Junkrat': 15,      // Great for area denial and spam from heights
            'Lucio': 15,        // Wall-riding excellent on volcanic surfaces
            'Moira': -5,        // Limited vertical mobility on volcanic terrain
            'Brigitte': -5,     // Shield less effective on multi-level terrain
            'Kiriko': 15,       // Teleport excellent for height variations
            'Ana': 10,          // Good sightlines from certain positions
            'Baptiste': 10,     // Exo-boots valuable for reaching different heights
            'Zenyatta': -10,    // Too vulnerable with limited mobility on volcanic terrain
            'Juno': 0,         // Struggles. Very open, lots of high ground, vulnerable to snipers/dive.
            'Hazard': -10,      // Leap useful but very exposed to range/snipers, Wall has few good choke points
            'Wrecking Ball': 20, // Exceptional mobility across volcanic terrain
            'Junker Queen': 0,   // Limited by vertical elements of volcano
            'Orisa': 0,         // Limited mobility on uneven terrain
            'Roadhog': 5,       // Hook effective near edges but limited mobility
            'Sigma': 10,        // Floating passive helps with volcanic terrain
            'Ramattra': -5,     // Limited by vertical elements and open spaces
            'Ashe': 15,         // Coach gun excellent for volcanic mobility
            'Echo': 20,         // Exceptional mobility across volcano
            'Sojourn': 10,      // Powerslide effective on certain parts of volcano
            'Cassidy': 0,       // Limited vertical mobility on volcanic terrain
            'Soldier: 76': 5,   // Sprint helpful but limited by height variations
            'Sombra': 15,       // Translocator excellent for accessing all volcano levels
            'Symmetra': 0,      // Turrets situational on uneven terrain
            'Torbjorn': 5,      // Turret placement limited by terrain variations
            'Bastion': -10,     // Too exposed and limited mobility on volcanic terrain
            'Mercy': 15,        // Guardian Angel excellent for volcanic traversal
            'Illari': 10,       // Good sightlines from certain volcano positions
            'Lifeweaver': 15,   // Petal platform excellent for height advantage
            'Venture': 20       // Exceptional grappling mobility across volcanic terrain
        }
    },
    {
        name: 'Blizzard World',
        image: 'Blizzard_World.png',
        category: 'Hybrid',
        counters: {
            'Mauga': -10,
            'Pharah': 10,
            'Widowmaker': -10,
            'Genji': 10, 
            'Hanzo': 10,
            'Tracer': -10,
            'Juno': 0,     // Mixed. Good on point A and final, but open middle section
            'Hazard': 5 // Good chokes on point A and final, but open areas in between
        }
    },
    { 
        name: 'Eichenwalde', 
        image: 'Eichenwalde.png',
        category: 'Hybrid',
        counters: {
            'Mauga': 10,
            'Pharah': 10,
            'Widowmaker': -10,
            'Genji': 10,
            'Hanzo': 10,
            'Tracer': -10,
            'Juno': 10,    // Strong. Bridge and castle provide good chokes for Ray, Glide useful
            'Hazard': 15 // Excellent wall usage on bridge, castle chokes, and final point
        }
    },
    { 
        name: 'Hollywood', 
        image: 'Hollywood.png',
        category: 'Hybrid',
        counters: {
            'Mauga': -20,
            'Pharah': 10,
            'Widowmaker': -10,
            'Genji': 10,
            'Hanzo': 10,
            'Tracer': -10,
            'Juno': -5,    // Weak. Point A decent, but streets/sound stage expose her to snipers
            'Hazard': -5 // Point A good, but very long sightlines and open areas later favor range
        }
    },
    { 
        name: 'Kings Row', 
        image: 'Kings_Row.png',
        category: 'Hybrid',
        counters: {
            'Mauga': 10,
            'Pharah': 10,
            'Widowmaker': -10,  
            'Genji': 10,
            'Hanzo': 10,
            'Tracer': -10,
            'Juno': 15,    // Excellent. Narrow streets with high ground for Glide rotation, great Torpedo/Ray value
            'Hazard': 15 // Excellent choke control throughout, especially streets phase and final point
        }
    },
    {
        name: 'Midtown', 
        image: 'Midtown.png',
        category: 'Hybrid',
        counters: {
            'Mauga': 10,
            'Pharah': 10,
            'Widowmaker': -10,
            'Genji': 10,
            'Hanzo': 10,
            'Tracer': -10,
            'Juno': 5,     // Okay. Good chokes for Ray pushes at first/final, vulnerable mid section
            'Hazard': 5 // Good chokes early and late, but open mid-section and high ground vulnerability
        }
    },
    {
        name: 'Numbani', 
        image: 'Numbani.png',
        category: 'Hybrid',
        counters: {
            'Mauga': -10,
            'Pharah': 10,
            'Widowmaker': -10,
            'Genji': 10,
            'Hanzo': 10,
            'Tracer': -10,
            'Juno': -10,   // Weak. Extremely vulnerable due to high ground focus, especially points B/C
            'Hazard': 0 // Point A decent, but later phases very open with strong high ground disadvantage
        }
    },
    { 
        name: 'Paraiso', 
        image: 'Paraiso.png',
        category: 'Hybrid',
        counters: {
            'Mauga': -10,
            'Pharah': 10,
            'Widowmaker': -10,
            'Genji': 10,
            'Hanzo': 10,
            'Tracer': -10,
            'Juno': -5,    // Weak. High ground focus and open areas expose her to dive/snipers
            'Hazard': -5 // Some chokes, but generally open with significant high ground play favoring range/mobility
        }
    },
    {
        name: "Circuit Royale",
        image: 'Circuit_Royale.png',
        category: 'Escort',
        counters: {
            'Mauga': -10,
            'Pharah': 10,
            'Widowmaker': -10,
            'Genji': 10,
            'Hanzo': 10,
            'Tracer': -10,
            'Juno': 10,    // Strong. Pro play map - despite long sightlines, limited flanks suit her
            'Hazard': -15 // Extremely long sightlines, very vulnerable to snipers/range, limited wall value
        }
    },
    {
        name: "Dorado",
        image: 'Dorado.png',
        category: 'Escort',
        counters: {
            'Mauga': -20,
            'Pharah': 10,
            'Widowmaker': -10,
            'Genji': 10,
            'Hanzo': 10,
            'Tracer': -10,
            'Juno': 10,    // Strong. Good chokes and tight spaces favor Torpedo/Ray value
            'Hazard': 10 // Good choke points and close-quarters areas, especially first and last points
        }
    },
    {
        name: "Havana",
        image: 'Havana.png',
        category: 'Escort',
        counters: {
            'Mauga': -20,
            'Pharah': 10,
            'Widowmaker': -10,
            'Genji': 10,
            'Hanzo': 10,
            'Tracer': -10,
            'Juno': -15,   // Very weak. Extremely long sightlines make Glide dangerous, Medic gun falloff issue
            'Hazard': -10 // Very long sightlines in first and third sections heavily favor range/snipers
        }
    },
    {
        name: "Junkertown",
        image: 'Junkertown.png',
        category: 'Escort',
        counters: {
            'Mauga': -20,
            'Pharah': 10,
            'Widowmaker': -10,
            'Genji': 10,
            'Hanzo': 10,
            'Tracer': -10,
            'Juno': -10,   // Weak. Very exposed in points A/C, vulnerable to snipers/flank
            'Hazard': -10 // Very open first and third points, heavily favors range/snipers, limited wall value
        }
    },
    {
        name: "Route 66",
        image: 'Route_66.png',
        category: 'Escort',
        counters: {
            'Mauga': -10,
            'Pharah': 10,
            'Widowmaker': -10,
            'Genji': 10,
            'Hanzo': 10,
            'Tracer': -10,
            'Juno': 5,     // Okay. Gas station/final point good, second point risky.
            'Hazard': 5 // Good chokes on first and last point, but second point is very open
        }
    },
    {
        name: 'Shambali', 
        image: 'Shambali.png',
        category: 'Escort',
        counters: {
            'Pharah': 10,
            'Widowmaker': -10,
            'Genji': 10,
            'Hanzo': 10,
            'Tracer': -10,
            'Juno': 10,    // Strong. Tight spaces and corridors excellent for Torpedoes and Ray, good flanking defense
            'Hazard': 10 // Numerous chokes and tight corners benefit wall/close combat
        }
    },
    {
        name: 'Watchpoint Gibraltar', 
        image: 'Gibraltar.png',
        category: 'Escort',
        counters: {
            'Mauga': -20,
            'Pharah': 10,
            'Widowmaker': -10,
            'Genji': 10,
            'Hanzo': 10,
            'Tracer': -10,
            'Juno': -15,   // Very weak. Multiple high grounds, easy flanks, Glide limited, very vulnerable
            'Hazard': -5 // Strong high grounds favor range/divers, some tight areas but often bypassable
        }
    },
    {
        name: 'New Junk City', 
        image: 'New_Junk_City.png',
        category: 'Flashpoint',
        counters: {
            'Mauga': 10,
            'Pharah': 10,
            'Widowmaker': -10,
            'Genji': 10,
            'Hanzo': 10,
            'Tracer': -10,
            'Juno': 0,     // Mixed. Effectiveness varies greatly between open and enclosed points
            'Hazard': 5 // Mix of open areas and tighter building points, Leap useful for rotation
        }
    },
    {
        name: 'Suravasa', 
        image: 'Suravasa.png',
        category: 'Flashpoint',
        counters: {
            'Mauga': 10,
            'Pharah': 10,
            'Widowmaker': -10,
            'Genji': 10,
            'Hanzo': 10,
            'Tracer': -10,
            'Juno': -5,    // Weak. Large size stresses rotation, many flanks challenge her survivability
            'Hazard': 0 // Very large, mix of open and closed points, high mobility needed, some vulnerability
        }
    },
    {
        name: 'Colosseo', 
        image: 'Colosseo.png',
        category: 'Push',
        counters: {
            'Pharah': 10,
            'Widowmaker': -10,
            'Genji': 10,
            'Hanzo': 10,
            'Tracer': -10,
            'Juno': 5,     // Okay. Central push area good for Ray, but flanks under bridge problematic
            'Hazard': 5 // Good wall usage in central area and under bridge, but vulnerable on flanks
        }
    },
    {
        name: 'Esperanca', 
        image: 'Esperanca.png',
        category: 'Push',
        counters: {
            'Mauga': -10,
            'Pharah': 10,
            'Widowmaker': -10,
            'Genji': 10,
            'Hanzo': 10,
            'Tracer': -10,
            'Juno': 0,     // Mixed. Good flanks but exposed center area. Glide mobility useful but risky.
            'Hazard': 0 // Mix of tight flanks (good) and open center/high ground (bad)
        }
    },
    {
        name: 'New Queen Street', 
        image: 'New_Queen_Street.png',
        category: 'Push',
        counters: {
            'Mauga': 10,
            'Pharah': 10,
            'Widowmaker': -10,
            'Genji': 10,
            'Hanzo': 10,
            'Tracer': -10,
            'Juno': 10,    // Strong. Tight urban environment favors Torpedo/Ray, good cover for Glide
            'Hazard': 10 // Numerous corners and tight spaces benefit wall/close combat
        }
    },
    {
        name: 'Runasapi', 
        image: 'Runasapi.png',
        category: 'Push',
        counters: {
            'Mauga': 10,
            'Pharah': 10,
            'Widowmaker': -10,
            'Genji': 10,
            'Hanzo': 10,
            'Tracer': -10,
            'Juno': 5,     // Okay. Verticality good for Glide rotations, mix of spaces requires adaptation
            'Hazard': 5 // Good verticality for Leap, some chokes, but also open areas
        }
    },
    {
        name: 'Hanaoka', 
        image: 'Hanaoka.png',
        category: 'Clash',
        counters: {
            'Mauga': 10,
            'Pharah': 10,
            'Widowmaker': -10,
            'Genji': 10,
            'Hanzo': 10,
            'Tracer': -10,
            'Juno': 10,    // Strong. Tight spaces excellent for close-quarters healing/damage
            'Hazard': 10 // Tight map with good wall potential and brawl focus
        }
    },
    {
        name: 'Throne of Anubis', 
        image: 'Throne_of_Anubis.png',
        category: 'Clash',
        counters: {
            'Pharah': 10,
            'Widowmaker': -10,
            'Genji': 10,
            'Hanzo': 10,
            'Tracer': -10,
            'Juno': 15,    // Very strong. Extremely tight chokes, Hyper Ring for engage/disengage, Ray excellent
            'Hazard': 15 // Extremely tight chokes and close-quarters favor wall/brawl
        }
    }
];

// Get references to HTML elements used in the interface
const heroList = document.getElementById('hero-list');             // Element to display available heroes
const searchInput = document.getElementById('search-input');       // Search input element for filtering heroes
const enemyTeamContainer = document.getElementById('enemy-team-container'); // Container for enemy team heroes
const clearButton = document.getElementById('clear-button');       // Button to clear the selected enemy team

// Function to create and return a hero card element for display
function createHeroCard(hero) {
    const heroCard = document.createElement('div');             // Create div for hero card
    heroCard.className = 'hero';                                // Assign "hero" class for styling
    heroCard.setAttribute('data-category', hero.category);
    heroCard.setAttribute('data-hero-name', hero.name); // <<< ADDED THIS LINE
    heroCard.style.backgroundImage = `url(images/${hero.image})`; // Set background image to hero's portrait

    const heroName = document.createElement('span');            // Create span element for hero's name and score
    heroName.textContent = `${hero.name} - ${hero.score}`;      // Set text to hero's name and score
    heroCard.appendChild(heroName);                             // Add hero's name to the hero card

    // Add click event to hero card to add hero to enemy team on click
    // We only add this listener by default. For enemy team cards, a different listener is added.
    if (!heroCard.classList.contains('in-enemy-team')) { // Check if it's not already marked for enemy team
        heroCard.addEventListener('click', () => {
            addHeroToEnemyTeam(hero);
        });
    }

    return heroCard;
}

// Function to filter heroes by category
function filterHeroesByCategory(heroesToFilter, category) {
    return category === 'All' 
        ? heroesToFilter 
        : heroesToFilter.filter(hero => hero.category === category);
}

// Function to display a list of hero cards in the hero list element
function displayHeroes(heroesToDisplay) {
    heroList.innerHTML = '';
    
    // Get the current active category
    const activeTab = document.querySelector('.hero-list .tab-button.active');
    const currentCategory = activeTab ? activeTab.getAttribute('data-category') : 'All';
    
    // Filter heroes by current category
    let filteredHeroes = filterHeroesByCategory(heroesToDisplay, currentCategory);

    // Apply search filter if there is input
    const searchQuery = searchInput.value.toLowerCase();
    if (searchQuery) {
        filteredHeroes = filteredHeroes.filter(hero =>                
            hero.name.toLowerCase().includes(searchQuery)
        );
    }
    
    // Define category order
    const categoryOrder = { 'Tank': 0, 'Support': 1, 'DPS': 2 };
    
    // Sort heroes by score first, then by category
    filteredHeroes.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score; // Sort by score in descending order
        }
        return categoryOrder[a.category] - categoryOrder[b.category]; // If scores are equal, sort by category
    });
    
    filteredHeroes.forEach(hero => {
        const heroCard = createHeroCard(hero);
        heroList.appendChild(heroCard);
    });
}

// Function to recalculate all hero scores based on current map and enemy team
function recalculateScores() {
    // Reset all hero scores to their original values first
    heroes.forEach(hero => {
        hero.score = hero.originalScore;
    });

    // Check if a map is selected and apply its adjustments
    const activeMapElement = document.querySelector('.map.active');
    if (activeMapElement) {
        const selectedMapName = activeMapElement.getAttribute('data-map');
        const selectedMapData = maps.find(m => m.name === selectedMapName);
        if (selectedMapData) {
            Object.entries(selectedMapData.counters).forEach(([heroName, adjustment]) => {
                const hero = heroes.find(h => h.name === heroName);
                if (hero) {
                    hero.score += adjustment;
                }
            });
        }
    }

    // Re-apply all enemy team counter adjustments
    const enemyTeamCards = enemyTeamContainer.querySelectorAll('.hero');
    enemyTeamCards.forEach(enemyCard => {
        const enemyHeroName = enemyCard.getAttribute('data-hero-name');
        if (!enemyHeroName) return; // Skip if name not found

        // Apply penalty to heroes countered by this enemy hero
        if (counters[enemyHeroName]) {
            counters[enemyHeroName].forEach(counteredHeroName => {
                const counteredHero = heroes.find(h => h.name === counteredHeroName);
                if (counteredHero) {
                    counteredHero.score -= 10;
                }
            });
        }

        // Apply bonus to heroes that counter this enemy hero
        for (const [counterHeroName, counteredHeroesList] of Object.entries(counters)) {
            if (counteredHeroesList.includes(enemyHeroName)) {
                const counterHero = heroes.find(h => h.name === counterHeroName);
                if (counterHero) {
                    counterHero.score += 10;
                }
            }
        }
    });

    // Update the hero list display
    displayHeroes(heroes);
}

// Function to add a hero to the enemy team and update scores of remaining heroes
function addHeroToEnemyTeam(heroToAdd) {
    // Prevent adding duplicates
    const existingEnemyNames = Array.from(enemyTeamContainer.querySelectorAll('.hero')).map(card => card.getAttribute('data-hero-name'));
    if (existingEnemyNames.includes(heroToAdd.name)) {
        // alert(`${heroToAdd.name} is already on the enemy team.`); // << REMOVED THIS LINE
        return; // Silently prevent adding duplicate
    }

    // Get the current team size limit from the dropdown
    const teamLimitSelect = document.getElementById('enemy-team-limit-select');
    const teamLimit = parseInt(teamLimitSelect.value, 10);

    if (enemyTeamContainer.children.length >= teamLimit) {
        alert(`Enemy team is already full (maximum ${teamLimit} heroes)`);
        return;
    }

    // Create a card specifically for the enemy team container
    const enemyHeroCard = createHeroCard(heroToAdd); 
    enemyHeroCard.classList.add('in-enemy-team'); // Mark it so the default click listener isn't added
    
    // Add the REMOVAL listener to this specific card
    enemyHeroCard.addEventListener('click', () => {
        removeHeroFromEnemyTeam(enemyHeroCard);
    });

    enemyTeamContainer.appendChild(enemyHeroCard);

    // Recalculate all scores after adding the new enemy
    recalculateScores(); 
}

// Function to remove a hero from the enemy team
function removeHeroFromEnemyTeam(cardElement) {
    enemyTeamContainer.removeChild(cardElement);
    // Recalculate all scores after removing the enemy
    recalculateScores();
}

// Display all heroes initially when the page loads
displayHeroes(heroes);

// Add event listener to filter heroes as the user types in the search input
searchInput.addEventListener('input', () => {
    const searchQuery = searchInput.value.toLowerCase();        // Get the search query in lowercase
    const filteredHeroes = heroes.filter(hero =>                // Filter heroes matching the search query
        hero.name.toLowerCase().includes(searchQuery)
    );
    displayHeroes(filteredHeroes);                              // Display the filtered list of heroes
});

// Function to handle clear button click
clearButton.addEventListener('click', () => {
    enemyTeamContainer.innerHTML = '';

    // Remove active class from any selected map
    const activeMap = document.querySelector('.map.active');
    if (activeMap) {
        activeMap.classList.remove('active');
    }

    // Reset heroes' scores to their original scores
    heroes.forEach(hero => {
        hero.score = hero.originalScore;
    });

    // Display heroes with current category filter
    displayHeroes(heroes);
});

// Category filtering
document.addEventListener('DOMContentLoaded', function() {
    // Hero category tabs
    const heroTabButtons = document.querySelectorAll('.hero-list .tab-button');
    heroTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all hero buttons
            heroTabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Display heroes with current category filter
            displayHeroes(heroes);
        });
    });

    // Map category tabs
    const mapTabButtons = document.querySelectorAll('.map-selection .tab-button');
    mapTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all map buttons
            mapTabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Display maps with current category filter
            displayMaps();
        });
    });

    // Initialize displays
    displayHeroes(heroes);
    displayMaps();
});

// Function to create and return a map card element
function createMapCard(map) {
    const mapCard = document.createElement('div');
    mapCard.className = 'map';
    mapCard.setAttribute('data-map', map.name);
    mapCard.style.backgroundImage = `url(images/Maps/${map.image})`;

    const mapName = document.createElement('span');
    mapName.textContent = map.name;
    mapCard.appendChild(mapName);

    mapCard.addEventListener('click', () => {
        // Check if this map is already selected
        if (mapCard.classList.contains('active')) {
            deselectMap(mapCard); // Call deselect function
        } else {
            selectMap(map); // Call select function
        }
    });

    return mapCard;
}

// Function to handle map selection
function selectMap(selectedMap) {
    // Remove active class from all maps first
    document.querySelectorAll('.map').forEach(map => {
        map.classList.remove('active');
    });

    // Add active class to the clicked map card
    const selectedMapElement = document.querySelector(`[data-map="${selectedMap.name}"]`);
    if (selectedMapElement) { 
        selectedMapElement.classList.add('active');
    }

    // Recalculate scores with the map selected
    recalculateScores();
}

// Function to handle map deselection
function deselectMap(mapCardElement) {
    mapCardElement.classList.remove('active');
    // Recalculate scores without any map selected
    recalculateScores(); 
}

// Function to filter maps by category
function filterMapsByCategory(mapsToFilter, category) {
    return category === 'All' 
        ? mapsToFilter 
        : mapsToFilter.filter(map => map.category === category);
}

// Function to display maps
function displayMaps() {
    const mapList = document.getElementById('map-list');
    mapList.innerHTML = '';
    
    // Get the current active category
    const activeTab = document.querySelector('.map-selection .tab-button.active');
    const currentCategory = activeTab ? activeTab.getAttribute('data-category') : 'All';
    
    // Filter maps by current category
    const filteredMaps = filterMapsByCategory(maps, currentCategory);
    
    filteredMaps.forEach(map => {
        const mapCard = createMapCard(map);
        mapList.appendChild(mapCard);
    });
}