// pages/api/deleteCandidate.js
import { deleteCandidate } from '@/app/lib/myAction'; // Импорт вашей функции

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await deleteCandidate(new FormData(req.body));
      res.status(200).json({ message: 'Кандидат успешно удален' });
    } catch (error) {
      console.error('Ошибка при удалении кандидата:', error);
      res.status(500).json({ message: 'Не удалось удалить кандидата' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
