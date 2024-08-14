
//////////////////// スマホハンバーガーメニューの開閉 ////////////////////
const NAV_BUTTON = document.querySelector('.header__nav-button');
const NAV_CLOSEBUTTON = document.querySelector('.header__nav-button__close');
const NAV_MENU = document.querySelector('.header__nav');
const BODY = document.querySelector('body');

function disableScroll(event) {
  event.preventDefault();
}

function enableScroll() {
  window.removeEventListener('touchmove', disableScroll, { passive: false });
  window.removeEventListener('wheel', disableScroll, { passive: false });
}

function NAV_OPEN() {
  BODY.classList.add('is-open');
  // スクロール禁止を有効化
  window.addEventListener('touchmove', disableScroll, { passive: false });
  window.addEventListener('wheel', disableScroll, { passive: false });
}

function NAV_CLOSE() {
  BODY.classList.remove('is-open');
  // スクロール禁止を解除
  enableScroll();
}

NAV_BUTTON.addEventListener('click', NAV_OPEN);
NAV_CLOSEBUTTON.addEventListener('click', NAV_CLOSE);


////////////////// スムーススクロールとページ内リンクがクリックされたらスマホメニューを閉じる //////////////////
const links = document.querySelectorAll('a[href^="#"]');

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const href = link.getAttribute('href');
    if (href === "#" || !href) {
      return; // hrefが空、もしくは単なる「#」の場合、処理を終了
    }

    const targetSection = document.querySelector(href);
    if (targetSection) {
      const sectionTop = targetSection.getBoundingClientRect().top;
      const currentPos = window.scrollY;

      // 画面幅が768px以下の場合にgapを60に、それ以外の場合は0に設定
      const gap = window.matchMedia('(max-width: 768px)').matches ? 60 : 0;
      const target = sectionTop + currentPos - gap;

      // スマホメニューを閉じる
      if (BODY.classList.contains('is-open')) {
        NAV_CLOSE();
      }

      window.scrollTo({
        top: target,
        behavior: 'smooth',
      });

    }
  });
});

// ウィンドウのリサイズ時にスクロールを再有効化
window.addEventListener('resize', enableScroll);


////////// トップへ戻るボタン //////////
const topButton = document.querySelector('.footer__link-top');

topButton.addEventListener('click', (e) => {
  e.preventDefault(); // デフォルトの動作を防止
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

////////// トップページのスライダー //////////
const swiperElements = document.querySelectorAll('.swiper');

if (swiperElements.length > 0) {
  swiperElements.forEach(swiperElement => {
    const swiper = new Swiper(swiperElement, {
      loop: true,
      paginationClickable: true,
      speed: 500,

      pagination: {
        el: swiperElement.querySelector('.swiper-pagination'),
        type: 'bullets',
        clickable: true,
        renderBullet: function (index, className) {
          return (
            '<span class="' +
            className +
            '">' +
            ['小学生', '中学生', '高等学校'][index] +
            '</span>'
          );
        }
      }
    });
  });
}

////////// シミュレーションページの責任開始日 //////////
document.addEventListener('DOMContentLoaded', function () {
  // 今日の日付を取得
  const today = new Date();
  // 今日から91日目の日付を計算
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + 91);

  // 日付のフォーマットを整える
  const year = futureDate.getFullYear();
  const month = futureDate.getMonth() + 1; // 月は0から始まるので1を足す
  const day = futureDate.getDate();

  // 日付を表示形式に変換
  const formattedDate = `${year}年${month}月${day}日`;

  // p.start__dateの中に表示
  const startDateElement = document.querySelector('.start__date');
  if (startDateElement) {
    startDateElement.textContent = formattedDate;
  }
});
