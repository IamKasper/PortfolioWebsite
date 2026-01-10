// Optional progressive enhancement for active navigation state
(function() {
    const currentPage = document.body.dataset.page;
    if (currentPage) {
        const activeLink = document.querySelector(`[data-nav="${currentPage}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
})();
