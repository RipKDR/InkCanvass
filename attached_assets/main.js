// Shared JS for navigation, motion preferences, and forms

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    // Respect reduced motion
    try {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduce-motion');
      }
    } catch (_) {}

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileToggle && navLinks) {
      if (mobileToggle.tagName !== 'BUTTON') {
        // ensure button semantics
        mobileToggle.setAttribute('role', 'button');
        mobileToggle.setAttribute('tabindex', '0');
      }
      mobileToggle.setAttribute('aria-expanded', 'false');
      const toggle = () => {
        const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', String(!expanded));
        navLinks.classList.toggle('open');
        mobileToggle.classList.toggle('active');
      };
      mobileToggle.addEventListener('click', toggle);
      mobileToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
    }

    // Filter buttons (gallery)
    document.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // Simple intersection fade-in
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -10% 0px' };
    if (!document.body.classList.contains('reduce-motion') && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, observerOptions);
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'all 0.6s ease';
        io.observe(el);
      });
    }

    // Booking form submit -> /api/bookings
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
      bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const getVal = (id) => {
          const el = document.getElementById(id); return el ? el.value.trim() : '';
        };
        const firstName = getVal('first-name');
        const lastName = getVal('last-name');
        const email = getVal('email');
        const phone = getVal('phone');
        const placement = getVal('placement');
        const size = getVal('size');
        const color = getVal('color');
        const budget = getVal('budget');
        const timeline = getVal('timeline');
        const experience = getVal('experience');
        const description = (document.getElementById('description')?.value || '').trim();
        const notes = (document.getElementById('notes')?.value || '').trim();
        const styles = Array.from(document.querySelectorAll('input[name="style"]:checked')).map((i) => i.value);
        // Optional: preferred artist if a select exists with id
        const preferredArtistEl = document.getElementById('preferred-artist');
        const preferredArtist = preferredArtistEl ? preferredArtistEl.value || undefined : undefined;

        const composed = [
          description,
          '',
          `Placement: ${placement || 'n/a'}`,
          `Size: ${size || 'n/a'}`,
          `Color: ${color || 'n/a'}`,
          budget ? `Budget: ${budget}` : '',
          timeline ? `Timeline: ${timeline}` : '',
          experience ? `Experience: ${experience}` : '',
          notes ? `Notes: ${notes}` : ''
        ].filter(Boolean).join('\n');

        const payload = {
          firstName, lastName, email, phone,
          preferredArtist: preferredArtist || undefined,
          styles,
          description: composed
        };

        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Submitting...'; }
        try {
          const res = await fetch('/api/bookings', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (!res.ok) throw new Error('Request failed');
          // success UI
          alert('Thanks! Your booking request has been received. We will respond within 24 hours.');
          bookingForm.reset();
        } catch (err) {
          console.error(err);
          alert('Sorry, there was a problem submitting your booking. Please try again or contact us by phone/email.');
        } finally {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'SUBMIT BOOKING REQUEST'; }
        }
      });
    }

    // Fix rating star encoding in hero stats if necessary
    document.querySelectorAll('.hero-stats .stat-item').forEach((item) => {
      const label = item.querySelector('.stat-label');
      const num = item.querySelector('.stat-number');
      if (label && num && /rating/i.test(label.textContent || '')) {
        const ntext = (num.textContent || '').replace(/[^0-9.]/g, '') || '4.9';
        num.innerHTML = `${ntext} &#9733;`;
      }
    });

    // Normalize testimonial stars
    document.querySelectorAll('.testimonials .stars').forEach((el) => {
      el.setAttribute('aria-label', '5 out of 5');
      el.textContent = '★★★★★';
    });

    // Booking page minor cleanups
    const uploadLabel = document.querySelector('.file-upload-label span');
    if (uploadLabel) uploadLabel.textContent = 'Click to upload images';
    const monthBtns = document.querySelectorAll('.month-btn');
    if (monthBtns.length >= 2) {
      monthBtns[0].textContent = '‹';
      monthBtns[monthBtns.length - 1].textContent = '›';
    }
    document.querySelectorAll('.contact-card .contact-icon').forEach((el, idx) => {
      const icons = ['📍', '📞', '✉'];
      el.textContent = icons[idx] || '✦';
    });
    document.querySelectorAll('.contact-card a').forEach((a) => {
      a.textContent = (a.textContent || '').replace(/[\uFFFD]+/g, '').replace(/\s+\S*$/,'').trim() || a.textContent;
    });

    // Smooth scrolling for on-page anchors
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  });
})();
