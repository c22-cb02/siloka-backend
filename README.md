# siloka-backend

Siloka-backend is a consumable REST API for the [siloka-client](https://github.com/c22-cb02/siloka-client) and collaboratively developed by Bangkit Academy 2022 Cohort.

Contributor to this repostory:

- Dennis Al Baihaqi Walangadi
- Gita Permatasari Sujatmiko
- Radhiansya Zain Antriksa Putra

## Tech Stacks

This project was built on top of:

- [Express](https://expressjs.com/)
- [Google Compute Engine](https://console.cloud.google.com/compute/instances)
- [Datastore](https://console.cloud.google.com/datastore)
- [Cloud Build](https://console.cloud.google.com/cloud-build/builds)
- [Container Registry](https://console.cloud.google.com/gcr/)
- [Cloud Logging](https://console.cloud.google.com/logs/query)

## Development

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
