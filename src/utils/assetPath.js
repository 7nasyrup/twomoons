/**
 * GitHub Pages のサブディレクトリ配置に対応するためのユーティリティ。
 * Vite の BASE_URL（import.meta.env.BASE_URL）をパスの先頭に付与して返す。
 *
 * 例: assetPath('/scene/classroom.png')
 *   → ローカル:      '/scene/classroom.png'
 *   → GitHub Pages: '/twomoons/scene/classroom.png'
 *
 * @param {string} path - /scene/... や /character/... など public/ 以下の絶対パス
 * @returns {string} BASE_URL を前置した完全パス
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // 末尾スラッシュを除去

export function assetPath(path) {
  if (!path) return path;
  // すでに http:// などの外部URLの場合はそのまま返す
  if (/^https?:\/\//.test(path)) return path;
  return `${base}${path}`;
}
