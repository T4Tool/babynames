import { NameItem } from '../types';

export function exportNamesToCsv(names: NameItem[], filename: string = 'namen_database_export.csv') {
  if (!names || names.length === 0) return;

  const headers = [
    'ID', 'Name', 'Meaning', 'Gender', 'Country', 'Origin', 'Religion', 'Pronunciation',
    'Style', 'Category', 'Popularity', 'Letter', 'Length', 'LuckyNumber', 'LuckyColor',
    'LuckyStone', 'LuckyDay', 'SEOSlug', 'Views', 'Favorites'
  ];

  const rows = names.map(n => [
    `"${n.id}"`,
    `"${n.name.replace(/"/g, '""')}"`,
    `"${n.meaning.replace(/"/g, '""')}"`,
    `"${n.gender}"`,
    `"${n.country}"`,
    `"${n.origin}"`,
    `"${n.religion}"`,
    `"${n.pronunciation}"`,
    `"${n.style}"`,
    `"${n.category}"`,
    n.popularity,
    `"${n.letter}"`,
    n.length,
    n.luckyNumber,
    `"${n.luckyColor}"`,
    `"${n.luckyStone}"`,
    `"${n.luckyDay}"`,
    `"${n.seoSlug}"`,
    n.views,
    n.favorites
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
