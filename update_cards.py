import re

with open("index.html", "r") as f:
    content = f.read()

def process_card(card_html):
    # Extract the View Detailed link
    detailed_match = re.search(r'<a href="([^"]+)" class="project-btn">\s*View Detailed\s*→\s*</a>\n?', card_html)
    if not detailed_match:
        return card_html
        
    link = detailed_match.group(1)
    
    # Replace the opening div
    card_html = card_html.replace('<div class="featured-card reveal">', f'<div class="featured-card reveal" onclick="window.location.href=\'{link}\'" style="cursor: pointer;">')
    
    # Add stopPropagation to GitHub link
    card_html = re.sub(r'(<a [^>]*?class="project-link"[^>]*?)>', r'\1 onclick="event.stopPropagation();">', card_html)
    
    # Remove the View Detailed link
    card_html = card_html.replace(detailed_match.group(0), '')
    
    return card_html

blocks = []
current_pos = 0
while True:
    start = content.find('<div class="featured-card reveal">', current_pos)
    if start == -1:
        blocks.append(content[current_pos:])
        break
    
    blocks.append(content[current_pos:start])
    
    next_start = content.find('<div class="featured-card reveal">', start + 1)
    if next_start == -1:
        next_start = len(content)
        
    card_html = content[start:next_start]
    blocks.append(process_card(card_html))
    current_pos = next_start

new_content = "".join(blocks)

with open("index.html", "w") as f:
    f.write(new_content)

print("Updated index.html")
