const fs = require('fs');

const html = fs.readFileSync('index (5).html', 'utf-8');
let depth = 0;
const stack = [];
const lines = html.split('\n');

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // simplified parser for open and close div tags
    const openMatches = [...line.matchAll(/<div/g)];
    const closeMatches = [...line.matchAll(/<\/div/g)];

    let currentOpen = openMatches.length;
    let currentClose = closeMatches.length;

    if (currentOpen > 0 || currentClose > 0) {
        depth += currentOpen - currentClose;
        
        if (line.includes('id="screen-') || line.includes('id="app-body"')) {
            console.log(`Line ${i+1}: ${line.trim()} (Depth: ${depth})`);
        }
        
    }
}
console.log(`Final depth: ${depth}`);
