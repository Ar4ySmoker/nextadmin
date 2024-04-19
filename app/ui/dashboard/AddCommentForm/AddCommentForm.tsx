// Компонент для добавления комментариев к кандидату
export default function AddCommentForm({ candidateId }) {
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const commentText = formData.get('commentText');
  
      const response = await fetch('/api/addComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ candidateId, commentText }),
      });
  
      if (response.ok) {
        console.log('Comment added');
      } else {
        console.error('Failed to add comment');
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <textarea name="commentText" required placeholder="Введите комментарий"></textarea>
        <button type="submit">Добавить комментарий</button>
      </form>
    );
  }
  