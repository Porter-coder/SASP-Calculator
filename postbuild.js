import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const htmlPath = join(process.cwd(), 'dist', 'index.html');
let html = readFileSync(htmlPath, 'utf-8');

// 移除 type="module" 和 crossorigin 属性
html = html.replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/g, '<script src="$1"></script>');
html = html.replace(/<script type="module" src="([^"]+)"><\/script>/g, '<script src="$1"></script>');

// 将主应用脚本从 head 移动到 body 底部（在 </body> 之前）
const scriptMatch = html.match(/<script src="\.\/assets\/index\.js"><\/script>/);
if (scriptMatch) {
  const scriptTag = scriptMatch[0];
  // 从 head 中移除
  html = html.replace(scriptTag, '');
  // 添加到 body 底部（在 </body> 之前）
  html = html.replace('</body>', `    ${scriptTag}\n  </body>`);
}

writeFileSync(htmlPath, html, 'utf-8');
console.log('✓ Post-build: Removed module type and moved script to body bottom');

