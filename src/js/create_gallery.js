function createGallery(elements) {
  const gallery = elements.map(el => {
    return `<div class="photo-card">
      <img src="${el.webformatURL}" alt="${el.tags}" class="photo-img" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes:${el.likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${el.views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${el.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${el.downloads}</b>
        </p>
      </div>
    </div>`;
  });
  return gallery.join('\n');
}

export { createGallery };
