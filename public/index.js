const addProduct = (e) => {
  e.preventDefault()
    const data = {
      name: document.querySelector("#id").value
    }

    console.log(data);

    const res = fetch("/api/product", {
      method: "post",
      data
    }).then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data);
    })

    if (res.status === 200) {
      console.log("Oke");
    }
}