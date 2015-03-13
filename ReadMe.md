# HAR Performance Viewer

This is a simple tool that parses HAR files and displays a line graph charting the change in Total Requests, Total Time, and Total Size. It separates each into Internal and External categories.

This tool is an ongoing project, and currently in rough form. As I find time, I'll push updates here.

## Setup

First, add a `config/domains.json` file that contains a list of Internal URLs. It should look like the following:

```json
{
  "internal": [
    "http://mysite.com",
    "https://mysite.com",
    "http://mysitestatic.com"
  ]
}
```

Finally, just run `node index.js` and you're good to go!

#### Development

If you're workng with the react files, you'll want to run `grunt watch`. For the server, simply run `nodemon index.js`


## Features

### Syncing

All browsers connected to the site are synced. The tool is intended to be used on a monitor viewable by the entire team; when someone needs to view a specific graph, they can use a computer or phone to quickly change the graph on their local device and have the change reflected on the larger monitor.

### Automatic Refresh

The server actively watches the `/har/` directory for new files, and updates the graphs as they come in.

## Roadmap

1. Right now, the state syncs across all clients. It'd be nice to have different clusters; That way you could run one server and have two different dedicated views for two different teams.
2. Blocking vs nonblocking time should be reflected in the Time graph
3. Time to first byte (internal vs external) should be reflected somehow
4. Changing datasets (ie, from homepage to searchpage)
5. Responsive Design
6. Show the resource breakdown
