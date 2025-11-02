export function injectSlideoutStyles() {
  const css = `
  @supports (transition-property: overlay) and (transition-behavior: allow-discrete) {
    .product-dialog[open] {
      transform: translateX(0);
    }

    @starting-style {
      .product-dialog[open] {
        transform: translateX(200%);
      }
    }

    .product-dialog {
      transition: transform 0.3s ease-out, overlay 0.3s ease-out allow-discrete,
        display 0.3s ease-out allow-discrete;
      transform: translateX(200%);
    }

    .product-dialog::backdrop {
      background-color: rgba(0, 0, 0, 0.05);
      transition: display 0.3s allow-discrete, overlay 0.3s allow-discrete, background-color 0.3s;
    }

    .product-dialog[open]::backdrop {
      background-color: rgba(0, 0, 0, 0.85);
    }

    @starting-style {
      .product-dialog[open]::backdrop {
        background-color: rgba(0, 0, 0, 0);
      }
    }
  }
    
  @supports (not (transition-property: overlay)) and (not (transition-behavior: allow-discrete)) { 

     .product-dialog {
      transform: translateX(200%);
    }
     .product-dialog[open] { 
      animation: slideIn 0.3s ease forwards;
    } 

    @keyframes slideIn {
      from {
        transform: translateX(200%);
      }
      to {
        transform: translateX(0);
      }
    }
  }
  `;

  if (document.getElementById('slideout-style')) return;

  const style = document.createElement('style');
  style.id = 'slideout-style';
  style.textContent = css;
  document.head.appendChild(style);
}
