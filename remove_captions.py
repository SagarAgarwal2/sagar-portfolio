import glob
import re

for filename in glob.glob("project-*.html"):
    with open(filename, 'r') as f:
        content = f.read()
    
    # Remove the <div class="screenshot-caption">...</div> lines
    new_content = re.sub(r'^\s*<div class="screenshot-caption">.*?</div>\n?', '', content, flags=re.MULTILINE | re.DOTALL)
    
    if new_content != content:
        with open(filename, 'w') as f:
            f.write(new_content)
        print(f"Updated {filename}")
