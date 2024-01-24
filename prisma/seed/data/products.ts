export const createProducts = (storeIds: string[], categoryIds: string[]) => {
  const productsData = [
    // Albert heijin products
    {
      price: 1.99,
      storeId: storeIds[0],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/pi39yPR0N86rRWBBBKD5ieCLpdsKF23BL-ZA47oLCes/rs:fit:720:539:1/g:ce/aHR0cHM6Ly93d3cu/ZHV0Y2hzdG9yZS5j/aC9ncm9zc2JyaXRh/bm5pZW4vaW1hZ2Vz/L3phYW5zZV9tYXlv/bmFpc2VfdHViZS5q/cGc',
      name: 'AH Zaanse mayonnaise',
      description: 'Mayonnaise made according to an authentic Dutch recipe.',
    },
    {
      price: 2.49,
      storeId: storeIds[0],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/sduAdMCzJEbX4TVlHMzXE5Sw7N7vv5JBeIJz2K5BlNU/rs:fit:800:800:1/g:ce/aHR0cHM6Ly9zdGF0/aWMuYWgubmwvZGFt/L3Byb2R1Y3QvQUhJ/XzQzNGQ1MDMxMzkz/NTM2MzYzNz9yZXZM/YWJlbD0yJnJlbmRp/dGlvbj04MDB4ODAw/X0pQR19ROTAmZmls/ZVR5cGU9YmluYXJ5',
      name: 'AH Scharreleieren',
      description: 'Free-range eggs from happy chickens.',
    },
    {
      price: 3.49,
      storeId: storeIds[0],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/ANb5cN-Tgr2XPnpKgQ4-7hILelfM0y9bZOnwoc7cA8o/rs:fit:1024:683:1/g:ce/aHR0cHM6Ly93d3cu/enV1dmVyLm51L3dw/LWNvbnRlbnQvdXBs/b2Fkcy9iaW9sb2dp/c2NoLWR5bmFtaXNj/aC12b2xrb3JlbmJy/b29kLW1ldC16b25u/ZWJsb2VtcGl0dGVu/LTEwMjR4NjgzLmpw/Zw',
      name: 'AH Biologisch volkorenbrood',
      description: 'Organic whole grain bread, baked fresh daily.',
    },
    {
      price: 4.99,
      storeId: storeIds[0],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/l8Q1-ruHuIFwcBheMxj4sT4ecrEjUjZM7WTMWua2Z6k/rs:fit:895:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5u/YzYyWGptOW9yakdC/UkhNWFNOdnZnSGFE/NyZwaWQ9QXBp',
      name: 'AH Basic kipfilet',
      description:
        'Affordable chicken breast fillet, perfect for sandwiches or salads.',
    },
    {
      price: 5.99,
      storeId: storeIds[0],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/QvI42Z5HymDs2dwKF3Bd1TXiHYtOOofchwIoALNH8P4/rs:fit:1200:1066:1/g:ce/aHR0cHM6Ly93d3cu/dmVnZ2lwZWRpYS5u/bC9hc3NldHMvMjgw/MGFkZmE4NS9nZWxl/LWtpd2ktZnJ1aXQt/dmVnZ2lwZWRpYS5q/cGc',
      name: 'AH Gele kiwi',
      description:
        'Sweeter and juicier than green kiwi, with a vibrant yellow flesh.',
    },

    // Jumbo products
    {
      price: 1.99,
      storeId: storeIds[1],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/LMb5H4Xr-MO9Cjqw3AjxCInkHMEostOxR_ezLVF7XRs/rs:fit:487:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC51/Nm9mdEwtb01pSW8z/ZThObE9PVklRSGFI/TiZwaWQ9QXBp',
      name: 'Jumbo Fresh Orange Juice 1L',
      description:
        'Enjoy the refreshing taste of freshly squeezed oranges with this delicious juice.',
    },
    {
      price: 2.49,
      storeId: storeIds[1],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/cd_8ipcaQaZwkq0LBFtXnYlUJYteweeMr0Gof6-kAbo/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5V/YVhyY1d3bGFZNS1o/VDJwdjFTM2NnSGFF/OCZwaWQ9QXBp',
      name: 'Jumbo Sourdough Bread',
      description:
        'This artisanal bread is made with high-quality flour and has a tangy, satisfying flavor.',
    },
    {
      price: 0.99,
      storeId: storeIds[1],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/SP2qdyhBOTHt-Qc5svGNtGXzKEEpuViGtsOUCiTckwo/rs:fit:759:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC56/OW9nZlNQRlo0bWd4/Yk9pVEdManhRSGFF/byZwaWQ9QXBp',
      name: 'Jumbo Cherry Tomatoes 250g',
      description:
        'These sweet and juicy cherry tomatoes are perfect for salads, snacking, or cooking.',
    },
    {
      price: 3.99,
      storeId: storeIds[1],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/83gAJb-EghuaScPN9jRCRfxix34etolB9DvPVb5_YT8/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC50/MURwLTBfSE4yOHhZ/eXE5d1FYZG9nSGFI/YSZwaWQ9QXBp',
      name: 'Jumbo Organic Beef Burgers 4-pack',
      description:
        'These flavorful burgers are made from 100% organic beef and are perfect for grilling.',
    },
    {
      price: 1.49,
      storeId: storeIds[1],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/EJHExlspD_8JPf_TdbpxTTfPcuswKZxZWlxIvLM4x48/rs:fit:643:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5r/N1hDYm1IS1dyeTlj/VUFJYnIxYU9nSGFG/ZCZwaWQ9QXBp',
      name: 'Jumbo Natural Yogurt 500g',
      description:
        'This creamy yogurt is made with all-natural ingredients and is perfect for breakfast or as a snack.',
    },
    // LIDL
    {
      price: 2.99,
      storeId: storeIds[2],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/Dquw2i_4cEUGEC3w_tdJlGJsi6kzMLsKkobgaQL4WW4/rs:fit:1200:959:1/g:ce/aHR0cDovL29mZmVy/cy5rZDIub3JnL3Bp/Y3MvNDEvNGUvNDE0/ZWNmZTA3YTBjZjAw/OGU1ZmNkZGZkZTBh/YmEyMjQzMzZjOWRm/YS5qcGc',
      name: 'Fairtrade Coffee Beans 500g',
      description:
        'This full-bodied coffee is made from Fairtrade-certified beans and has a rich, satisfying flavor.',
    },
    {
      price: 1.49,
      storeId: storeIds[2],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/lIOuLZ7kF3wU9wmsuV-C2XXTRdSQkIInlj5fY1Ho1Rk/rs:fit:1024:768:1/g:ce/aHR0cHM6Ly9saXZl/LnN0YXRpY2ZsaWNr/ci5jb20vMTY3NC8y/NjQ5ODk4MzA3Nl9l/MjBiYjc5YjJmX2Iu/anBn',
      name: 'Wholemeal Bread',
      description:
        'This wholemeal bread is high in fiber and nutrients and is perfect for sandwiches or toast.',
    },
    {
      price: 0.99,
      storeId: storeIds[2],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/pWIMwCGjrSdmboJUrvFRz9ZEsRV9Q0QakXyWS4ZyPa0/rs:fit:600:450:1/g:ce/aHR0cDovL29mZmVy/cy5rZDIub3JnL3Bp/Y3MvYmQvN2UvYmQ3/ZWY5ZDYzMWY5ODlm/MDYxMjE2N2M3Nzlj/ZWQ3NDdiODRmZWRj/YS5qcGc',
      name: 'Mixed Salad Leaves 200g',
      description:
        'This fresh and crisp salad mix is perfect for adding some greens to your meals.',
    },
    {
      price: 2.99,
      storeId: storeIds[2],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/WJ02_LhZwBKqmsRFpConwFEeo-XIIWKfDKG-5PjvLmc/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9leHRl/cm5hbC1wcmV2aWV3/LnJlZGQuaXQvRi1f/eV9zUHAwY0tzaTJ5/STd0aFYtX3FKWGNz/dFI0VUJVR01pT3Rk/eUxXdy5qcGc_YXV0/bz13ZWJwJnM9M2E2/N2ZlZDQ0NjI1Zjhl/ZTFlMjc0YmFhMjQw/OTIwOGVmMmFiYmQ1/ZA',
      name: 'Vegetarian Burger Patties 4-pack',
      description:
        'These delicious vegetarian burger patties are made from plant-based ingredients and are perfect for grilling or frying.',
    },
    {
      price: 4.99,
      storeId: storeIds[2],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/K2miRWMZHTs6EsvHQTO18e5rJyAjdNBA9mqcHVtDpfM/rs:fit:713:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5z/cllDQkVleXZ4aGh5/Y1haZkRKOXNRSGFF/NyZwaWQ9QXBp',
      name: 'Huisgemaakte Spaghetti Bolognese',
      description:
        'Huisgemaakte spaghetti bolognese, gemaakt met verse tomaten en kruiden.',
    },
    // Aldi
    {
      price: 2.49,
      storeId: storeIds[3],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/LRRFZqZoT74DxIOn3Wr_0WDi2MWfYXk3XE4pf1P58f4/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9rZGhh/a2EuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE5LzEyL09j/ZWFuLXNwcmF5LUNy/YW5iZXJyeS1DbGFz/c2ljLTEuNUxpdC1V/U0EuanBn',
      name: 'Ocean Spray Cranberry Classic',
      description:
        'Deze cranberrysap is gemaakt van de beste Noord-Amerikaanse cranberries en bevat geen toegevoegde suikers.',
    },
    {
      price: 1.99,
      storeId: storeIds[3],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/Uvc0knRWygqahqjBcuJHS5mBD5D2OvJ4-g-kfN615cM/rs:fit:300:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5y/bDZueEhtR1BfeXNX/X0tqNTRGbW5RQUFB/QSZwaWQ9QXBp',
      name: 'Kania Shaker Salade',
      description:
        'Een handige shaker met verschillende kruiden en specerijen voor een heerlijke salade.',
    },
    {
      price: 2.99,
      storeId: storeIds[3],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/v05VvsnjGtTwS32L0OOc9wA0Y5hYE2m3Wy911qdlgOw/rs:fit:632:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC40/Ty1LbHdJeVJjODJH/ZFRCcnBQaS1BSGFG/aiZwaWQ9QXBp',
      name: 'Goldessa Spread Naturel',
      description:
        'Een romige en smeerbare kaasspread gemaakt van natuurlijke ingrediënten.',
    },
    {
      price: 4.49,
      storeId: storeIds[3],
      categoryId: categoryIds[1],
      url: 'https://imgs.search.brave.com/tK3u3-Ay6IqXJcqhdv40Z1OT9sKNUUJFwgtYiIwB2Xk/rs:fit:688:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5x/ZmRwTS0wdkFSRmJf/QVVfUnh1VVlnQUFB/QSZwaWQ9QXBp',
      name: 'Huismerk Vitamine D',
      description:
        'Een voedingssupplement in tabletvorm met extra vitamine D om de weerstand te ondersteunen.',
    },
    {
      price: 1.25,
      storeId: storeIds[3],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/ZDaLj1HYUPHG-VJK7wZX0k0TpoCMGp73NgrG3bO_okI/rs:fit:553:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5T/dXBxVUM2dWp5cVFE/ZTFPYmNVcEt3SGFH/VyZwaWQ9QXBp',
      name: "Clancy's Ribbelchips Naturel",
      description:
        'Een zak met heerlijke ribbelchips met een lekkere crunch en een volle aardappelsmaak.',
    },
    // PLUS
    {
      price: 1.99,
      storeId: storeIds[4],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/iJP0DP5NJJ7ieOGVbHdw04iA3FReJx6TtpvQ51Eb9uM/rs:fit:450:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5E/elRDYTAyNjFDQ1I3/VllFaGNiRlNnQUFB/QSZwaWQ9QXBp',
      name: 'PLUS Milk',
      description: 'Fresh, full-fat milk from Dutch cows.',
    },
    {
      price: 3.49,
      storeId: storeIds[4],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/yNkZv58Dy-sPSd9PQGTvlbE2mcXnVB0G8PdycGomCVI/rs:fit:826:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC54/bngydndLV1NRQXph/VEIwQ25maUxRSGFF/USZwaWQ9QXBp',
      name: 'PLUS Organic Carrots',
      description: 'Organically grown carrots, perfect for roasting.',
    },
    {
      price: 2.99,
      storeId: storeIds[4],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/dsQ86HV-tu0RjV8_nAqKsismW8suvy_3cHcT1OnGbes/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5J/ZjVWRE1lbDFTZlNh/X0lVNmNCVmZ3SGFI/YSZwaWQ9QXBp',
      name: 'Digiorno Frozen Pizza Margherita',
      description: 'A classic pizza with tomato sauce, mozzarella and basil.',
    },
    {
      price: 4.99,
      storeId: storeIds[4],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/TtIzAme6LYIEOwYohBm-LGP9rL4TnAopJnRFvI096Go/rs:fit:612:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC43/WDJqUjFLa0VXODVk/YVV2U0J3VVVBSGFG/diZwaWQ9QXBp',
      name: 'Belgian Chocolate Ice Cream',
      description: 'Luxurious ice cream with swirls of Belgian chocolate.',
    },
    {
      price: 2.49,
      storeId: storeIds[4],
      categoryId: categoryIds[0],
      url: 'https://imgs.search.brave.com/YfN4avhdgEGLO1Nbql5jfpuecgJuoU2lOuV0nSznEvk/rs:fit:668:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/dzZjLWt1UkQwbnVV/WC1uNlE1ZV9nSGFG/USZwaWQ9QXBp',
      name: 'Blueberry Yogurt',
      description: 'Creamy yogurt with real blueberries and a hint of vanilla.',
    },
    // H&M
    {
      price: 29.99,
      storeId: storeIds[5],
      categoryId: categoryIds[2],
      url: 'https://imgs.search.brave.com/6_CZVeN3w7miYnGijr007kNRkqP6TmbSkYDYanmSITc/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4t/OEhLT3dVMUowRk9K/SVVselJpVzBBSGFI/YSZwaWQ9QXBp',
      name: 'Hoodie with Printed Design',
      description:
        'Hoodie in lightweight sweatshirt fabric with a printed design. Lined drawstring hood, kangaroo pocket, and ribbing at cuffs and hem. Soft, brushed inside.',
    },
    {
      price: 19.99,
      storeId: storeIds[5],
      categoryId: categoryIds[2],
      url: 'https://imgs.search.brave.com/FrWc6pJ4G7jJGeVYybmtbvXix_7LDXzIaYydrcnM6Mk/rs:fit:905:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5E/cXlmRDRSN2taWTUz/LTdmbE5UT1BBSGFE/NCZwaWQ9QXBp',
      name: 'Sports Bra Medium Support',
      description:
        'Sports bra in fast-drying, functional fabric with a mesh racer back and medium support. Wide, elasticated lower edge with a concealed pocket at the back for a key or card. Lined front.',
    },
    {
      price: 49.99,
      storeId: storeIds[5],
      categoryId: categoryIds[2],
      url: 'https://imgs.search.brave.com/zqqRbNdFcE7zOZDcXx8j4mflhdE5v4qTkHwJaGWX1rM/rs:fit:905:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC45/Ums0VGJjMUszdmZ6/UVRJUklhWmt3SGFE/NCZwaWQ9QXBp',
      name: 'Sports Jacket',
      description:
        'Jacket in fast-drying, functional fabric with a hood, zip down the front and welt side pockets. Mesh-lined ventilation sections under the arms, and cuffs with thumbholes. Elastication at the hem. Reflective details.',
    },
    {
      price: 34.99,
      storeId: storeIds[5],
      categoryId: categoryIds[2],
      url: 'https://imgs.search.brave.com/Tv5QcAtkWX4qzXoTT3-DtbuuBNd8Zl-jU_9EaaW2PwE/rs:fit:905:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/bGVxTWxaUEFnUmFC/bU53emsyMTlBSGFE/NCZwaWQ9QXBp',
      name: 'Sports Tights High Waist',
      description:
        'Sports tights in fast-drying, functional fabric with a high waist and wide waistband. Mesh panels at the sides and knees, and a concealed key pocket in the waistband. Lined gusset.',
    },
    {
      price: 39.99,
      storeId: storeIds[5],
      categoryId: categoryIds[2],
      url: 'https://imgs.search.brave.com/TSMmwB8SgnnH0U0uqi8Y416a7PNvUQNCt-aFT6HwO1g/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2Uy/LmV4cGxpY2l0LmJp/bmcubmV0L3RoP2lk/PU9JUC4xVmUwUzlo/M0tQSlJJWWNNSW15/VVp3SGFFOCZwaWQ9/QXBp',
      name: 'Seamless Sports Top',
      description:
        'Sports top in fast-drying, functional fabric with a seamless design. High neck, long sleeves, and thumbholes at the cuffs. Ventilation holes at the sides and back, and a ribbed section at the back. Lined at the front.',
    },
    // Zara
    {
      price: 29.99,
      storeId: storeIds[6],
      categoryId: categoryIds[2],
      url: 'https://imgs.search.brave.com/krh7mZQfC0O7Jy2yTHdg9v-KQwtVnf5QnHLxkCk88bo/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC45/OS0tVjlhX2d2bmhH/WWpZMFBJVmVBSGFI/YSZwaWQ9QXBp',
      name: 'Oversized Sweater with Embroidered Lettering',
      description:
        'An oversized sweater featuring a round neckline, dropped shoulders, long sleeves and ribbed trims. This piece is crafted using a mix of yarns, including recycled polyester.',
    },
    {
      price: 39.99,
      storeId: storeIds[6],
      categoryId: categoryIds[2],
      url: 'https://imgs.search.brave.com/oKvG9Ve26MyXhaUj4g_x6Gi5s_cijgArZ2bEiybr9Dk/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5h/NWpNREVnMEM1MFdh/RjdwVG84cjVnSGFI/YSZwaWQ9QXBp',
      name: 'Leather Ballet Flats with Bow',
      description:
        'Ballet flats with a square toe and a bow detail on the front. Featuring a leather upper and lining, and a comfortable padded insole made from recycled materials. Soles made from natural rubber and recycled materials.',
    },
    {
      price: 59.99,
      storeId: storeIds[6],
      categoryId: categoryIds[2],
      url: 'https://imgs.search.brave.com/3RY7FsMILRoLwgbfo9p1OJsKnAIy5AP0GGnQaLagvss/rs:fit:905:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5i/c1JCcGpQaVhHUTNU/MVpPdUpxMHdnSGFE/NCZwaWQ9QXBp',
      name: 'Turtleneck Sweater with Side Slits',
      description:
        'Turtleneck sweater with long sleeves, dropped shoulders and side vents at the hem. Featuring ribbed trims and a slightly oversized fit. Made using a blend of recycled polyester and wool.',
    },
    {
      price: 25.99,
      storeId: storeIds[6],
      categoryId: categoryIds[2],
      url: 'https://imgs.search.brave.com/5mFOPeBUgm0lc0cJoO0E-Yy600K_eGhumalONf1qmHM/rs:fit:670:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5F/Y0R1S2dFRU1xYTh4/RzIxOGt0V1lnSGFG/UCZwaWQ9QXBp',
      name: 'Pack of 2 Basic T-Shirts',
      description:
        'Pack of two short sleeve t-shirts with a round neckline and a straight cut. Made using organic cotton, which is grown using natural fertilisers and pesticides. It is also environmentally friendly and requires less water than conventional cotton.',
    },
    {
      price: 79.99,
      storeId: storeIds[6],
      categoryId: categoryIds[2],
      url: 'https://imgs.search.brave.com/xUJYoVZ4SfiGtXwbkOwXqjQsX3hzk6qKxrNAcT3o2ww/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC55/N0pMRG8wdFFBM2Nx/MVZkNG9pQkZ3SGFI/YSZwaWQ9QXBp',
      name: 'Leather Crossbody Bag with Clasp',
      description:
        'Crossbody bag with a leather exterior and a flap closure with a clasp. Featuring an adjustable chain strap and a lined interior with a zip pocket. Soles made from natural rubber and recycled materials.',
    },
    // wehkamp
    {
      price: 25.99,
      storeId: storeIds[7],
      categoryId: categoryIds[2],
      url: 'https://imgs.search.brave.com/oH2yf0vYjPZ6fMlLN7G5Kd2POU8UvqoGGVT-nr5WvyE/rs:fit:300:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4y/eENVT0FKQTFaVlR2/M2JrdjBCdW5BQUFB/QSZwaWQ9QXBp',
      name: 'Wollen trui',
      description: 'Mooie wollen trui met V-hals',
    },
    {
      price: 12.99,
      storeId: storeIds[7],
      categoryId: categoryIds[2],
      url: 'https://imgs.search.brave.com/yGyKSrA31tsSFnAMzqv58kb3m1oNE13utMqf7J73Mzo/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5i/R1U3NHMwS3RnYTdU/RFNaTUt2UGJnSGFI/YSZwaWQ9QXBp',
      name: 'Basic T-shirt',
      description: 'Basic T-shirt in diverse kleuren',
    },
    {
      price: 59.99,
      storeId: storeIds[7],
      categoryId: categoryIds[2],
      url: 'https://imgs.search.brave.com/2328PgRcDWREh1M7B2QTV-YUtaMvpKS1XC9vNa5Krf4/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5f/aXdGU3lrVFdNOU5w/OGVpeUhOaVd3SGFI/YSZwaWQ9QXBp',
      name: 'Leren laarzen',
      description: 'Stoere leren laarzen met hak',
    },
    {
      price: 44.99,
      storeId: storeIds[7],
      categoryId: categoryIds[2],
      url: 'https://imgs.search.brave.com/ZODuPXLA5OPpEz3UwS-nasjLVM10P-64IfKrB_stGC0/rs:fit:442:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5w/VmZTN0Q4MVNWZXR2/dW55U1N0NzRBSGFI/OCZwaWQ9QXBp',
      name: 'Gebloemde jurk',
      description: 'Mooie gebloemde jurk met lange mouwen',
    },
    {
      price: 39.99,
      storeId: storeIds[7],
      categoryId: categoryIds[2],
      url: 'https://imgs.search.brave.com/6QJH51ClEttxtzloskVF5wtYNbpai4_jSuC5IY1_J4M/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5D/dlZvR0czTXlRM1dS/WHRBaUJMdUhRSGFI/YSZwaWQ9QXBp',
      name: 'Denim broek',
      description: 'Stoere denim broek met scheuren',
    },
    // Kruidvat
    {
      price: 3.99,
      storeId: storeIds[8],
      categoryId: categoryIds[1],
      url: 'https://imgs.search.brave.com/aXa50DAKNwmTRIujtdoIMclPyl3TmJjWtGFpnLy8QvA/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5a/ZmZBa0Q3T0RHbG01/YWxyRHF0MmhnSGFF/OCZwaWQ9QXBp',
      name: 'Cleansing Wipes',
      description: 'Soft and gentle cleansing wipes for sensitive skin.',
    },
    {
      price: 9.99,
      storeId: storeIds[8],
      categoryId: categoryIds[1],
      url: 'https://imgs.search.brave.com/aqz_S3fcrxE_VZsnveAkuqsjxoBahD1g6wMqWYlkUOc/rs:fit:695:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5T/MlBwMWxEalNSWlMx/aVZrcEp6clFBSGFG/RCZwaWQ9QXBp',
      name: 'Night Cream',
      description: 'Hydrating night cream with retinol for smoother skin.',
    },
    {
      price: 5.49,
      storeId: storeIds[8],
      categoryId: categoryIds[1],
      url: 'https://imgs.search.brave.com/x-8zaoedXS5MK9IDzLZpKLpSUoxnTJjWlfdXFf8jr64/rs:fit:632:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5m/NHd1WUM4TzFmYkxP/dFE0XzBGblNBRWdE/WSZwaWQ9QXBp',
      name: 'Hand Soap',
      description: 'Gentle hand soap with moisturizing ingredients.',
    },
    {
      price: 12.99,
      storeId: storeIds[8],
      categoryId: categoryIds[1],
      url: 'https://imgs.search.brave.com/wWuK5h_IYLKdycqVqPws6mtYDMqo8C45O9QbgX8NXEg/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC42/QW9oeVQ5NWR4dktU/U0Jmb01vZ05BSGFF/OCZwaWQ9QXBp',
      name: 'Facial Serum',
      description: 'Nourishing serum with vitamin C for brighter skin.',
    },
    {
      price: 7.99,
      storeId: storeIds[8],
      categoryId: categoryIds[1],
      url: 'https://imgs.search.brave.com/jvFhuN10l5nySbSNfNMBs2DJ3a99CxFAKX0_vDpb758/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5W/MTJ4U2pXRDVkbnh5/Ymt6djhtaU5nSGFF/OCZwaWQ9QXBp',
      name: 'Body Lotion',
      description: 'Lightweight lotion with aloe vera for softer skin.',
    },
    // etos
    {
      price: 3.99,
      storeId: storeIds[9],
      categoryId: categoryIds[1],
      url: 'https://imgs.search.brave.com/robkAYwhzXrB7l8bzYKDuh3O16DZ7iXfnJBQfK2rOVA/rs:fit:632:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5i/MG5sX1M0QWdIcFlT/TVRGbjJxSkhRSGFG/aiZwaWQ9QXBp',
      name: 'Citroen Shampoo',
      description: 'Shampoo with lemon extract to refresh and revitalize hair.',
    },
    {
      price: 4.49,
      storeId: storeIds[9],
      categoryId: categoryIds[1],
      url: 'https://imgs.search.brave.com/YvA9TtPPHT6WZb7qcLt5N70It7cV4xqMCE2PReLZzMA/rs:fit:647:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5P/MW5oeEpsOXZEdlhq/Y196Z3pKOGtnSGFG/YiZwaWQ9QXBp',
      name: 'Sensitive Day Cream',
      description: 'Gentle moisturizing cream for sensitive skin.',
    },
    {
      price: 2.99,
      storeId: storeIds[9],
      categoryId: categoryIds[1],
      url: 'https://imgs.search.brave.com/9YNN1C16EkU0iuVEHXy1fGjDmRHz5un-nLxqU3educA/rs:fit:844:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5q/dlp5OUd2eHNNT2J0/X2YwZUJTVm9nSGFF/SyZwaWQ9QXBp',
      name: 'Nourishing Oil',
      description: 'Multi-purpose oil for hair, skin, and nails.',
    },
    {
      price: 1.99,
      storeId: storeIds[9],
      categoryId: categoryIds[1],
      url: 'https://imgs.search.brave.com/EMy2Kf5GCklF3k4AmR_ZSwxFq-RKKO9qHofVnH2Y-eI/rs:fit:713:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5F/eFpxR2pRZ1RuT1Q2/ZTk4RV9EWXZ3SGFF/NyZwaWQ9QXBp',
      name: 'Cleansing Lotion',
      description: 'Gentle cleansing lotion for the face.',
    },
    {
      price: 3.29,
      storeId: storeIds[9],
      categoryId: categoryIds[1],
      url: 'https://imgs.search.brave.com/fPX2w1HYbJoM7Fp2T0uTeSmBWT7IQLUhH_nD69wlIdc/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5h/Z2R2bG4zNW1KZjUt/X05IYlVBenBRSGFF/OCZwaWQ9QXBp',
      name: 'Oil-Free Eye Makeup Remover',
      description: 'Gentle but effective formula for removing eye makeup.',
    },
  ];
  return productsData;
};
