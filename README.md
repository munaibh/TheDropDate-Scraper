# TheDropDate-Scraper
A website scraper made using Express and Cheerio, this is an educational project to learn how to scrape and format JSON data and deliver it in a Restful API form.


## Installation

*You must have installed both `Node` and `NPM`. If you haven't got either, visit [nodejs.org](https://www.nodejs.org) and follow the installation guides to get started.*

```bash
$ git clone https://github.com/munaibh/TheDropDate-Scraper.git
$ cd TheDropDate-Scraper
```

## Usage

The only command needed to get started is:

```bash
$ npm start
```

## API Reference

Below are some example calls that can be used with the API.

| NAME             | METHOD          | DESCRIPTION
| ---------------- | --------------- | -------------------
| /brands          | GET             | Returns an array of all the brands of clothing offered by the website.
| /promotions      | GET             | Returns an array of JSON data each containing a title, image and link pertaining to promotions currently available.
| /releases/page/1 | GET         | Returns an array of JSON data for releases each containing: title, availablity, available date, link, image and tags.
| /quick-links/page/1 |GET | Returns JSON data pertaining to promotions containing a title, link and image.


## Example Response

This example will use the url `/releases/page/1` as shown above and an example response is shown below, these responses will contain an extra key and value which is named `next_page` and is a boolean value to depict ifmore data is available.

```javascript
{
  results: [
    {
      title: "Nike Air Max Jewell",
      available_text: "AVAILABLE NOW",
      available_date: null,
      link_href: "http://tinyurl.com/jrp8l2y",
      image: "https://www.thedropdate.com/wp-content/uploads/2017/03/Nike-Air-Max-Jewell-Wms-dlrp-300x300.jpg",
      tags: [
        "Available",
        "Nike",
        "Releases"
      ]
    },
    {
      title: "Reebok Zoku Runner Ultraknit",
      available_text: "AVAILABLE NOW",
      available_date: null,
      link_href: "https://goo.gl/90X4kS",
      image: "https://www.thedropdate.com/wp-content/uploads/2017/03/Reebok-Zoku-Runner-Ultraknit-dlrp-300x300.jpg",
      tags: [
        "Available",
        "Reebok",
        "Releases"
      ]
    }
  ],
  next_page: true
}
```



