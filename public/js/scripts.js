window.addEventListener("DOMContentLoaded", function () {
  alert("Hello TEJ!");

  // For Quantity increase and decrease buttons
  const plusButtons = document.querySelectorAll(".quantity-btn-plus");
  const minusButtons = document.querySelectorAll(".quantity-btn-minus");
  
  //For samosa
  const samosaPriceInput = document.getElementById("Samosa-Price");
  const samosaQuantityContainer = document.querySelector(".samosa-quantity-container");
  const samosaQuantityLabel = samosaQuantityContainer.querySelector(".samosa-quantity-label");
  const samosaPlusBtn = samosaQuantityContainer.querySelector(".quantity-btn-plus");
  const samosaMinusBtn = samosaQuantityContainer.querySelector(".quantity-btn-minus");
  const samosaTotal = document.getElementById("samosa-total");

  //samosa total price
  function updateSamosaTotal() {
    const price = parseFloat(samosaPriceInput.value) || 0;
    const quantity = parseInt(samosaQuantityLabel.textContent) || 0;
    const total = price * quantity;
    samosaTotal.textContent = total.toFixed(2);
    updateTotalPrice();
    updateVatPrice();
    updateTipPrice();
    
  }

  samosaPlusBtn.addEventListener("click", () => {
    let quantity = parseInt(samosaQuantityLabel.textContent) || 0;
    quantity++;
    samosaQuantityLabel.textContent = quantity;
    updateSamosaTotal();
  });

  samosaMinusBtn.addEventListener("click", () => {
    let quantity = parseInt(samosaQuantityLabel.textContent) || 0;
    if (quantity > 0) {
      quantity--;
      samosaQuantityLabel.textContent = quantity;
      updateSamosaTotal();
    }
  });

  samosaPriceInput.addEventListener("input", () => {
    updateSamosaTotal();
  });

  const teaPriceInput = document.getElementById("Tea-Price");
  const teaQuantityContainer = document.querySelector(".tea-quantity-container");
  const teaQuantityLabel = teaQuantityContainer.querySelector(".tea-quantity-label");
  const teaPlusBtn = teaQuantityContainer.querySelector(".tea-quantity-btn-plus");
  const teaMinusBtn = teaQuantityContainer.querySelector(".tea-quantity-btn-minus");
  const teaTotal = document.getElementById("tea-total");

  function updateTeaTotal() {
    const teaprice = parseFloat(teaPriceInput.value) || 0;
    const teaquantity = parseInt(teaQuantityLabel.textContent) || 0;
    const teatotal = teaprice * teaquantity;
    teaTotal.textContent = teatotal.toFixed(2);
    updateTotalPrice();
    updateVatPrice();
    updateTipPrice();
    
  }

  teaPlusBtn.addEventListener("click", () => {
    let teaquantity = parseInt(teaQuantityLabel.textContent) || 0;
    teaquantity++;
    teaQuantityLabel.textContent = teaquantity;
    updateTeaTotal();
  });

  teaMinusBtn.addEventListener("click", () => {
    let teaquantity = parseInt(teaQuantityLabel.textContent) || 0;
    if (teaquantity > 0) {
      teaquantity--;
      teaQuantityLabel.textContent = teaquantity;
      updateTeaTotal();
    }
  });

  teaPriceInput.addEventListener("input", () => {
    updateTeaTotal();
  });

  const totalPriceBoth = document.getElementById("Total-price");

  function updateTotalPrice() {
    const samosa = parseFloat(samosaTotal.textContent) || 0;
    const tea = parseFloat(teaTotal.textContent) || 0;
    totalPriceBoth.textContent = (samosa + tea).toFixed(2);
  }

  //fot vat
  const Vat = document.getElementById("Vat");

  function updateVatPrice() {
    const vatPrice = parseFloat(totalPriceBoth.textContent) || 0;
    Vat.textContent = (vatPrice * 0.13).toFixed(2);
  }

  //for tip
  const Tip = document.getElementById("Tip");

  function updateTipPrice() {
    const tipPrice = parseFloat(totalPriceBoth.textContent) || 0;
    Tip.textContent = (tipPrice * 0.10).toFixed(2);
  }

  const button = document.getElementById('myButton');
  const grandTotalSpan = document.getElementById('Grand-Total');

  button.addEventListener('click', function() {
    
  let grandTotalbtn =(parseFloat(totalPriceBoth.textContent) || 0) + (parseFloat(Vat.textContent) || 0) + (parseFloat(Tip.textContent) || 0);
    grandTotalSpan.textContent = grandTotalbtn.toFixed(2);
  });


document.getElementById('SubmitBill').addEventListener('click', async () => {
  const grandTotal = parseFloat(document.getElementById('Grand-Total').textContent) || 0;
  console.log(grandTotal);
  const response = await fetch('/api/bills', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ grandTotal })
  });

  if (response.ok) {
    alert('The Bill submitted successfully!');
  } else {
    alert('Failed to submit bill.');
  }
});
});