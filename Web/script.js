let cart = []
let modalQt = 1
let modalKey = 0


const c = (el) => document.querySelector(el)
const cs = (el) => document.querySelectorAll(el)

// LISTAGEM DAS refeicoes

refeicoesJson.map((item,index) => {
    let refeicoesItem = c('.models .refeicoes-item').cloneNode(true)

    refeicoesItem.setAttribute('data-key', index)
    refeicoesItem.querySelector('.refeicoes-item--img img').src = item.img 
    refeicoesItem.querySelector('.refeicoes-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    refeicoesItem.querySelector('.refeicoes-item--name').innerHTML = item.name
    refeicoesItem.querySelector('.refeicoes-item--desc').innerHTML = item.description
    refeicoesItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault()
        let key = e.target.closest('.refeicoes-item').getAttribute('data-key')
        modalQt = 1

        modalKey = key

        c('.refeicoesBig img').src = refeicoesJson[key].img
        c('.refeicoesInfo h1').innerHTML = refeicoesJson[key].name
        c('.refeicoesInfo--desc').innerHTML = refeicoesJson[key].description
        c('.refeicoesInfo--actualPrice').innerHTML = `R$ ${refeicoesJson[key].price.toFixed(2)}`
        c('.refeicoesInfo--size.selected').classList.remove('selected')

        cs('.refeicoesInfo--size').forEach((size, sizeIndex) => {

            if(sizeIndex == 2) {
                size.classList.add('selected')
            }

            size.querySelector('span').innerHTML = refeicoesJson[key].sizes[sizeIndex]

        })

        c('.refeicoesInfo--qt').innerHTML = modalQt

        c('.refeicoesWindowArea').style.display = 'flex'
        c('.refeicoesWindowArea').style.opacity = 0 
        setTimeout(() => {
            c('.refeicoesWindowArea').style.opacity = 1 
        }, 200)
        
    })
   

    c('.refeicoes-area').append(refeicoesItem)
})


function closeModal () {
    c('.refeicoesWindowArea').style.opacity = 0
    setTimeout(() => {
        c('.refeicoesWindowArea').style.display = 'none'
    }, 500)
}
cs('.refeicoesInfo--cancelButton, .refeicoesInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal)
})

c('.refeicoesInfo--qtmenos').addEventListener('click', () => {
    if(modalQt > 1) {
        modalQt--
        c('.refeicoesInfo--qt').innerHTML = modalQt
    }
})

c('.refeicoesInfo--qtmais').addEventListener('click', () => {
    modalQt++
    c('.refeicoesInfo--qt').innerHTML = modalQt
})
cs('.refeicoesInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        c('.refeicoesInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    })
})

c('.refeicoesInfo--addButton').addEventListener('click', () => {
    let size = parseInt(c('.refeicoesInfo--size.selected').getAttribute('data-key'))
    let identifier = refeicoesJson[modalKey].id+ '@' + size
    let key = cart.findIndex((item) => item.identifier == identifier)
    if (key > -1) {
        cart[key].qt+= modalQt
    }else {
        cart.push({
            identifier,
            id: refeicoesJson[modalKey].id,
            size,
            qt: modalQt,
        })
    }
    updateCart()
    closeModal()

})

c('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0) {
        c('aside').style.left = '0'
    }
    
})

c('.menu-closer').addEventListener('click', () => {
    c('aside').style.left = '100vw'
})

function updateCart () {
    c('.menu-openner span').innerHTML = cart.length

    if(cart.length > 0) {
        c('aside').classList.add('show')
        c('.cart').innerHTML = ''

        let subtotal = 0
        let desconto = 0
        let total = 0

        for(let i in cart) {
            let refeicoesItem = refeicoesJson.find((item) => item.id == cart[i].id)
            subtotal += refeicoesItem.price * cart[i].qt


            let cartItem = c('.models .cart--item').cloneNode(true)

            let refeicoesSizeName
            switch(cart[i].size){
                case 0:
                    refeicoesSizeName = 'P'
                    break
                case 1:
                    refeicoesSizeName = 'M'
                    break
                case 2:
                    refeicoesSizeName = 'G'
                    break
            }
            let refeicoesName = `${refeicoesItem.name} (${refeicoesSizeName})`

            cartItem.querySelector('img').src = refeicoesItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = refeicoesName
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if(cart[i].qt > 1) {
                    cart[i].qt--
                }else {
                    cart.splice(i, 1)
                }
                updateCart()
            })
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++
                updateCart()
            })

            c('.cart').append(cartItem)

        }

        desconto = subtotal * 0.1
        total = subtotal - desconto
        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`

    }else {
        c('aside').classList.remove('show')
        c('aside').style.left = '100vw'
    }
}