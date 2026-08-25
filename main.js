/* EVONCORE — main.js
   Mobile nav, scroll-reveal, animated stat counters, FAQ accordion. */
document.documentElement.classList.add('js-ready');

document.addEventListener('DOMContentLoaded', () => {

  /* Mobile nav & Dropdown handling */
  const burger = document.querySelector('.nav-burger');
  const links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      links.classList.toggle('open');
    });
  }

  /* Dropdown interactivity */
  const dropdownLi = document.querySelector('.nav-links .has-dropdown');
  const dropdownToggle = dropdownLi?.querySelector('.dropdown-toggle');
  if (dropdownLi && dropdownToggle) {
    dropdownToggle.addEventListener('click', (e) => {
      // If mobile view or user clicked explicitly, toggle open
      if (window.innerWidth <= 900) {
        e.preventDefault();
        dropdownLi.classList.toggle('open');
      }
    });

    document.addEventListener('click', (e) => {
      if (!dropdownLi.contains(e.target)) {
        dropdownLi.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdownLi.classList.remove('open');
      }
    });
  }

  // Close mobile drawer when clicking direct page links or dropdown item links
  if (links) {
    links.querySelectorAll('a:not(.dropdown-toggle)').forEach(a => {
      a.addEventListener('click', () => {
        burger?.classList.remove('open');
        links.classList.remove('open');
        dropdownLi?.classList.remove('open');
      });
    });
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* Animated stat counters */
  const counters = document.querySelectorAll('.num[data-count]');
  const animateCounter = (el) => {
    const raw = el.dataset.count.trim();
    const match = raw.match(/^([^\d]*)([\d,.]+)(.*)$/);
    if (!match) { el.textContent = raw; return; }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr.replace(/,/g, ''));
    const decimals = (numStr.split('.')[1] || '').length;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = prefix + value.toLocaleString(undefined, {
        minimumFractionDigits: decimals, maximumFractionDigits: decimals
      }) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && counters.length) {
    const cIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          cIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cIo.observe(el));
  } else {
    counters.forEach(animateCounter);
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      item.closest('.section, .wrap')?.querySelectorAll('.faq-item.open')
        .forEach(other => { if (other !== item) other.classList.remove('open'); });
      item.classList.toggle('open', !wasOpen);
    });
  });

  /* Interactive Performance & Milestone Showcase (2023 - 2026) */
  const milestoneData = {
    "2023": {
      revenue: "$420,000",
      growth: "25% Net Profit Ratio",
      roas: "$105.0K Net Profit",
      stores: "14 Managed Stores",
      headline: "🚀 6-Figure Amazon FBA & Shopify Launch",
      title: "Scaled 14 Stores to $420K Avg Revenue & 25% Net Profit",
      desc: "Established 6-figure store operating models after initial ad spend ramp and product catalog deployment across Amazon Seller Central and Shopify DTC.",
      list: [
        "<b>$420K Avg Revenue</b> per managed brand account",
        "<b>25% Net Profit Ratio</b> ($105.0K net profit per store)",
        "<b>$105.0K Net Profit</b> returned directly to store partners",
        "<b>0.00% Defect Rate</b> on Amazon Seller Central orders"
      ]
    },
    "2024": {
      revenue: "$680,000",
      growth: "33% Net Profit Ratio (+8% Spike)",
      roas: "$224.4K Net Profit",
      stores: "28 Managed Stores",
      headline: "⚡ TikTok Creator Affiliates (+8% Margin Spike)",
      title: "Scaled 28 Stores to $680K Avg Revenue & 33% Net Profit",
      desc: "Pioneered automated creator outreach and organic viral campaigns, reducing customer acquisition costs and boosting net profit margins by +8% up to 33%.",
      list: [
        "<b>$680K Avg Revenue</b> per active client store",
        "<b>33% Net Profit Ratio</b> ($224.4K net profit per store)",
        "<b>$224.4K Net Profit</b> returned directly to store owners",
        "<b>450+ Active Affiliates</b> driving low-cost organic sales"
      ]
    },
    "2025": {
      revenue: "$880,000",
      growth: "31% Net Profit Ratio (-2% Shift)",
      roas: "$272.8K Net Profit",
      stores: "42 Managed Stores",
      headline: "👑 6-Figure Multi-Platform Scale & $272.8K Profit",
      title: "Scaled 42 Stores to $880K Avg Revenue & 31% Net Profit",
      desc: "Expanded 42 stores across Amazon FBA, Shopify, TikTok Shop, and Walmart. Revenue grew to $880K while margin dipped -2% to 31%, still delivering $272.8K net profit per store.",
      list: [
        "<b>$880K Avg Revenue</b> per partner store account (highest volume)",
        "<b>31% Net Profit Ratio</b> ($272.8K net profit per store)",
        "<b>$272.8K Net Profit</b> (+21.5% net profit dollar growth vs 2024)",
        "<b>14-Day Onboarding</b> average deployment window for new stores"
      ]
    },
    "2026": {
      revenue: "$960,000",
      growth: "35% Net Profit Ratio (+7% Spike)",
      roas: "$336.0K Net Profit",
      stores: "58 Managed Stores",
      headline: "🤖 AI Logistics & Direct Factory Sourcing",
      title: "Pacing $960K Avg Store Revenue & 35% Net Profit Ratio",
      desc: "Secured direct factory bulk pricing and automated 3PL shipping rates, driving net profit margins back up to 35% ($336K net profit per store).",
      list: [
        "<b>$960K Avg Revenue</b> pacing toward $1M+ milestone",
        "<b>35% Net Profit Ratio</b> ($336.0K net profit per store)",
        "<b>$336.0K Net Profit</b> returned to store owners",
        "<b>98% Account Health</b> average across managed portals"
      ]
    }
  };

  const msContainer = document.querySelector('.milestone-showcase');
  if (msContainer) {
    const tabs = msContainer.querySelectorAll('.ms-tab-btn');
    const elRevenue = msContainer.querySelector('[data-ms="revenue"]');
    const elGrowth = msContainer.querySelector('[data-ms="growth"]');
    const elRoas = msContainer.querySelector('[data-ms="roas"]');
    const elStores = msContainer.querySelector('[data-ms="stores"]');
    const elHeadline = msContainer.querySelector('[data-ms="headline"]');
    const elTitle = msContainer.querySelector('[data-ms="title"]');
    const elDesc = msContainer.querySelector('[data-ms="desc"]');
    const elList = msContainer.querySelector('[data-ms="list"]');

    const updateShowcase = (year) => {
      const d = milestoneData[year];
      if (!d) return;

      if (elRevenue) elRevenue.textContent = d.revenue;
      if (elGrowth) elGrowth.textContent = d.growth;
      if (elRoas) elRoas.textContent = d.roas;
      if (elStores) elStores.textContent = d.stores;
      if (elHeadline) elHeadline.textContent = d.headline;
      if (elTitle) elTitle.textContent = d.title;
      if (elDesc) elDesc.textContent = d.desc;
      if (elList) {
        elList.innerHTML = d.list.map(item => `<li>${item}</li>`).join('');
      }
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        updateShowcase(tab.dataset.year);
      });
    });

    // Default to current/YTD year (2026)
    const defaultYear = '2026';
    updateShowcase(defaultYear);
    tabs.forEach(t => {
      if (t.dataset.year === defaultYear) t.classList.add('active');
      else t.classList.remove('active');
    });
  }

  /* Dashboard Image Lightbox Modal */
  const dashImgWraps = document.querySelectorAll('.dash-card .imgwrap:not(.promo-wrap)');
  if (dashImgWraps.length) {
    let modal = document.querySelector('.dash-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'dash-modal';
      modal.innerHTML = `
        <div class="dash-modal-backdrop"></div>
        <div class="dash-modal-content">
          <div class="dash-modal-header">
            <h4 id="dash-modal-title">Live Store Dashboard Snapshot</h4>
            <button class="dash-modal-close" aria-label="Close modal">&times;</button>
          </div>
          <div class="dash-modal-body">
            <img id="dash-modal-img" src="" alt="Dashboard snapshot">
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    const modalImg = modal.querySelector('#dash-modal-img');
    const modalTitle = modal.querySelector('#dash-modal-title');
    const modalClose = modal.querySelector('.dash-modal-close');
    const modalBackdrop = modal.querySelector('.dash-modal-backdrop');

    const closeModal = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    };

    dashImgWraps.forEach(wrap => {
      wrap.addEventListener('click', () => {
        const img = wrap.querySelector('img');
        const card = wrap.closest('.dash-card');
        const title = card ? card.querySelector('h4')?.textContent : 'Store Dashboard Snapshot';
        if (img) {
          modalImg.src = img.src;
          modalImg.alt = img.alt || 'Dashboard snapshot';
          if (modalTitle) modalTitle.textContent = title || 'Verified Performance Snapshot';
          modal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    modalClose?.addEventListener('click', closeModal);
    modalBackdrop?.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  /* Contact Form AJAX Submission (Web3Forms) */
  const contactForm = document.getElementById('contact-form');
  const formResult = document.getElementById('form-result');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && formResult && submitBtn) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const origBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting Request...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      formResult.style.display = 'block';
      formResult.style.color = '#818CF8';
      formResult.textContent = 'Sending your details securely...';

      const formData = new FormData(contactForm);

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();

        if (data.success) {
          formResult.style.color = '#10B981';
          formResult.style.fontWeight = '600';
          formResult.textContent = '✓ Thank you! Your strategy call request has been sent. Our team will contact you within 24 hours.';
          contactForm.reset();
        } else {
          formResult.style.color = '#EF4444';
          formResult.textContent = data.message || 'Something went wrong. Please email us directly at info@evoncore.com.';
        }
      } catch (err) {
        formResult.style.color = '#EF4444';
        formResult.textContent = 'Unable to send request. Please email us directly at info@evoncore.com.';
      } finally {
        submitBtn.textContent = origBtnText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }
    });
  }

});
