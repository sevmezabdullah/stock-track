import { useEffect, useState } from "react";


// HTTP Protokolü - GET, POST, PUT, DELETE

// fetch API
// axios



// BACKEND'den gelen API URL Bilgisini kullanmamız gerekiyor. 
// Query,Parametere, Body,
function App() {


  const [productName, setProductName] = useState("")
  const [stock, setStock] = useState("")
  const [expireDate, setExpireDate] = useState(null)
  const [country, setCountry] = useState("")
  const [color, setColor] = useState("")
  const [weight, setWeight] = useState("")

  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isUpdate, setIsUpdate] = useState(false)




  useEffect(() => {

    const token = localStorage.getItem('token')
    if (token) {
      fetch("http://localhost:4000/api/product/getAll",
        {
          headers: {
            "Authorization": `Bearer ${token}`
          },
        }
      ).then(res => res.json()).then(data => {
        setProducts(data.products)
      })
    }

  }, [isUpdate])


  const handleName = (e) => {
    setProductName(e.target.value)
  }
  const handleStock = (e) => {
    setStock(e.target.value)
  }

  const handleExpireDate = (e) => {
    setExpireDate(e.target.value)
  }

  const handleCountry = (e) => {
    setCountry(e.target.value)
  }

  const handleColor = (e) => {
    setColor(e.target.value)
  }

  const handleWeight = (e) => {
    setWeight(e.target.value)
  }


  const saveProduct = (e) => {
    fetch("http://localhost4000/api/product/create", {
      method: 'POST',
      body: JSON.stringify({ productName, stock, expireDate, country, color, weight }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      alert("Ürün Kaydedildi")
    }).catch(err => {
      alert("Ürün Kaydedilemedi")
    })
    e.preventDefault()
  }

  const updateProduct = (e) => {
    fetch("http://localhost:4000/api/product/update", {
      method: 'PUT',
      body: JSON.stringify({ _id: selectedProduct._id, productName, stock, expireDate, country, color, weight }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const deleteProduct = (_id) => {
    fetch(`http://localhost:4000/api/product/delete/${_id}`, {
      method: 'DELETE'
    }).then(() => {
      alert("Ürün Silindi")
    }).catch(err => {
      alert("Ürün Silinemedi")
    })
    setProducts(products.filter(product => product._id !== _id))
    setIsUpdate(!isUpdate)
  }

  const selectProduct = (e, product) => {
    setSelectedProduct(product)
    setProductName(product.productName)
    setStock(product.stock)
    //setExpireDate(product.expireDate)
    setCountry(product.country)
    setColor(product.color)
    setWeight(product.weight)
    e.preventDefault()
  }

  const cleanForm = () => {
    setSelectedProduct(null)
    setProductName("")
    setStock("")
    setExpireDate(null)
    setCountry("")
    setColor("")
    setWeight("")
    setIsUpdate(false)
  }


  return (
    <>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div>
          <h1>Ürün Ekleme Formu</h1>
          <form onSubmit={saveProduct}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10
            }}>
              <input value={productName} onChange={handleName} type="text" placeholder="Ürün Adı" />
              <input value={stock} onChange={handleStock} type="text" placeholder="Stok Miktarı" />
              <input value={expireDate} onChange={handleExpireDate} type="date" placeholder="Son Kullanma Tarihi" />
              <input value={country} onChange={handleCountry} type="text" placeholder="Menşei" />
              <input value={color} onChange={handleColor} type="text" placeholder="Paket Rengi" />
              <input value={weight} onChange={handleWeight} type="text" placeholder="Ağırlık" />
              <div style={{
                display: 'flex',
                gap: 10,
                justifyContent: 'space-between'
              }}>
                {!isUpdate && <button style={{
                  background: 'green',
                  color: 'white',
                  padding: 10
                }} type="submit">Kaydet</button>}

                {isUpdate && <button style={{
                  background: 'green',
                  color: 'white',
                  padding: 10
                }} type="button" onClick={(e) => {
                  updateProduct();
                  cleanForm()
                  e.preventDefault();
                }}>Güncelle</button>}
                <button onClick={(e) => {
                  cleanForm()
                  e.preventDefault()
                }}>Temizle</button>
              </div>

            </div>
          </form>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 20
        }}>
          <input type="text" placeholder="Ürün Ara" /></div>
        <div style={{
          marginTop: 20
        }}>
          <table style={{
            border: '1px solid black',
            width: '100%'
          }}>
            <thead>
              <tr>
                <th style={{
                  border: '1px solid black'
                }}>Ürün Adı</th>
                <th style={{
                  border: '1px solid black'
                }}>Stok Miktarı</th>
                <th style={{
                  border: '1px solid black'
                }}>Son Kullanma Tarihi</th>
                <th style={{
                  border: '1px solid black'
                }}>Menşei</th>
                <th style={{
                  border: '1px solid black'
                }}>Paket Rengi</th>
                <th style={{
                  border: '1px solid black'
                }}>Ağırlık</th>
                <th style={{
                  border: '1px solid black'
                }}>Eylemler</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td style={{
                    border: '1px solid black'
                  }}>{product.productName}</td>
                  <td style={{
                    border: '1px solid black'
                  }}>{product.stock}</td>
                  <td style={{
                    border: '1px solid black'
                  }}>{product.expireDate}</td>
                  <td style={{
                    border: '1px solid black'
                  }}>{product.country}</td>
                  <td style={{
                    border: '1px solid black'
                  }}>{product.color}</td>
                  <td style={{
                    border: '1px solid black'
                  }}>{product.weight}</td>
                  <td style={{
                    border: '1px solid black'
                  }}>
                    <button onClick={(e) => {
                      deleteProduct(product._id);
                      e.preventDefault()
                    }} style={{
                      background: 'red',
                      color: 'white',
                      padding: 10
                    }}>Sil</button>
                    <button
                      onClick={(e) => {
                        setIsUpdate(true)
                        selectProduct(e, product)
                      }}
                      style={{
                        background: 'green',
                        color: 'white',
                        padding: 10
                      }}>Güncelle</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot></tfoot>
          </table>

        </div>

      </div>

    </>
  )
}

export default App
