// Enable scroll highlight
document.addEventListener('DOMContentLoaded', function () {
  const headers = document.querySelectorAll('.book .book-body h1, .book .book-body h2, .book .book-body h3');
  const tocLinks = document.querySelectorAll('.book .book-body .tocify .tocify-item a');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          const link = Array.from(tocLinks).find((link) => link.getAttribute('href').endsWith('#' + id));
          if (link) {
            tocLinks.forEach((l) => l.classList.remove('active'));
            link.classList.add('active');
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  headers.forEach((header) => observer.observe(header));
});
