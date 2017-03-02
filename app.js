// Get and Set Varaiables
var express = require('express')
var request = require('request')
var cheerio = require('cheerio')
var base    = 'https://www.thedropdate.com/trainers'
var port    = process.env.port || 3000
var app = express()

// Get Paginated Content
var getPaginatedContent = (url, callback) => {
  request.get(url, (err, response, body) => {

    // Load Cheerio and Get Page Info
    var $ = cheerio.load(body);
    var pagination = $('.pagination li:last-child a:last-of-type').attr('href');
    if(pagination == undefined) return res.setStatus(404).json({error: "Not Found"})

    var pages   = pagination.split('/')
    var total   = parseInt(pages[pages.length -1 ])
    var current = parseInt($('.pagination li.active a').text())
    var morePages = (current < total) ? true : false
    callback($, morePages)
  })
}

// Get List of Groups (Brands)
app.get('/brands', (req, res) => {
  request.get('http://www.thedropdate.com/', (err, response, body) => {
    var $ = cheerio.load(body);
    var classes = $('.filter-group.brands li a').map(function() { return $(this).text() }).get()
    res.json({brands: classes})
  })
})

// Get Available Promotions
app.get('/promotions', (req, res) => {
  request.get(`${base}/promotions`, (err, response, body) => {

    var $ = cheerio.load(body);
    var results = $('.ga').map(function() {
      var $this = $(this)
      var title = $this.find('.title a').text()
      var image = $this.find('.clothingImage img').attr('src')
      var link  = $this.find('.title a').attr('href')
      return ({title: title, image: image, link_href: link})
    }).get()

    res.json(results)
  })
})

// Get Content (Releases, Quick Links)
app.get('/:type/page/:id', (req, res) => {

  var result = [];
  var params = req.params
  var url = `${base}/${params.type}/page/${params.id}`

  getPaginatedContent(url, ($, pages) => {

    $('.ga').each(function()  {

      var $this = $(this)
      var split = $this.find('.title a').text().split("–")
      var title = split.slice(0, split.length - 1).join("–").trim()
      var date  = split[split.length-1].trim()
      var iso   = new Date(date)
      var link  = $this.find('.title a').attr('href')
      var image = $this.find('.view img').attr('src')
      var tags  = $this.find('.cat').map(function() {
        return $(this).text().replace('-', "").trim()
      }).get()


      if(params.type == 'quick-links') {
        result.push({
          title: split.join(),  link_href: link, image: image
        })
      }
      else {
        result.push({
          title: title, available_text: date, available_date: iso,
          link_href: link, image: image, tags: tags
        })
      }

    })

    res.json({
      results: result,
      next_page: pages
    })

  })

})

// Start Server
app.listen(port, () => {
  console.log(`Listening on Port ${port}`)
})
