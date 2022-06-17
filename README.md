# siloka-backend

Siloka-backend is a consumable REST API for the [siloka-client](https://github.com/c22-cb02/siloka-client) and collaboratively developed by Bangkit Academy 2022 Cohort.

Contributor to this repostory:

- [Dennis Al Baihaqi Walangadi](https://github.com/dnswd)
- [Gita Permatasari Sujatmiko](https://github.com/gpersable)
- [Radhiansya Zain Antriksa Putra](https://github.com/RadhiansyaZ)

## Tech Stacks

This project was built on top of:

- [Express.js](https://expressjs.com/)
- [Google Compute Engine](https://console.cloud.google.com/compute/instances)
- [Datastore](https://console.cloud.google.com/datastore)
- [Cloud Build](https://console.cloud.google.com/cloud-build/builds)
- [Container Registry](https://console.cloud.google.com/gcr/)
- [Cloud Logging](https://console.cloud.google.com/logs/query)

## Development

1. Install dependencies
   ```
   npm install
   ```
2. Create `.env` file and fill it with
   ```
   GOOGLE_APPLICATION_CREDENTIALS='local/path/to/service_account_key_datastore.json'
   ML_HOST='ml_service_host_url:port'
   ```

### Running the Service without Container

```bash
$ npm start
```

### Building the Container

```bash
$ docker build -t siloka-backend .
```

### Running the Container

```bash
$ docker run -d -p 80:80 siloka-backend
```
