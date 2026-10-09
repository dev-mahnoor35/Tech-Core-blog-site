// Pricing Modal Dynamic Handler
document.addEventListener('DOMContentLoaded', () => {
  // Inject Modal HTML into Body
  const modalHTML = `
    <div id="pricing-modal" class="modal-overlay">
      <div class="modal-content">
        <button class="close-modal" id="close-modal-btn">&times;</button>
        <span class="modal-badge">SELECTED COURSE PLAN</span>
        <h2 id="modal-course-title">Full-Stack Web Architecture</h2>
        <p class="modal-sub">Choose a pricing tier to unlock instant access to video modules, source code, and private AI prompts.</p>
        
        <div class="pricing-grid">
          <div class="pricing-card">
            <h4>Basic Access</h4>
            <div class="price" id="modal-price-basic">$149</div>
            <p>One-time payment</p>
            <ul>
              <li>✓ Lifetime access to course videos</li>
              <li>✓ Downloadable source code</li>
              <li>✓ Community forum access</li>
            </ul>
            <button class="btn-select-plan" onclick="alert('Proceeding to Checkout...')">Select Basic</button>
          </div>

          <div class="pricing-card featured">
            <span class="featured-tag">POPULAR</span>
            <h4>Pro Dev Bundle</h4>
            <div class="price">$199</div>
            <p>One-time payment</p>
            <ul>
              <li>✓ Everything in Basic</li>
              <li>✓ AI Prompt Vault & Automation Templates</li>
              <li>✓ 1-on-1 Code Review & Certificate</li>
            </ul>
            <button class="btn-select-plan primary" onclick="alert('Proceeding to Checkout...')">Select Pro Bundle</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal = document.getElementById('pricing-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');

  // Open Modal on Arrow Click
  document.querySelectorAll('.btn-arrow').forEach(arrow => {
    arrow.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const card = arrow.closest('.course-card');
      const title = card.querySelector('.course-title').innerText;
      const price = card.querySelector('.price-tag').innerText;

      document.getElementById('modal-course-title').innerText = title;
      document.getElementById('modal-price-basic').innerText = price;

      modal.classList.add('active');
    });
  });

  // Close Modal
  closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
});