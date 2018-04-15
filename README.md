<h3 align="center"><i>Powered by <a href="https://loopback.io/">LoopBack</a> and <a href="https://angular.io/">Angular</a></i></h3>

<br>

## About

Ht-cloud is a ectric fire monitor system run on the cloud for [whhtsj/ 武汉华天世纪](http://www.hbdyt.com.cn/) It is
built using a collection of great Open Source projects, including but not limited to:

* [LoopBack](https://loopback.io/) - API server based on Express.
* [Angular](https://angular.io/) - MVC framework to build web apps.
* [LoopBack SDK Builder](https://www.npmjs.com/package/@mean-expert/loopback-sdk-builder) - Awesome integration of
  Loopback and Angular.
* [ng-alain](https://github.com/cipchk/ng-alain) - ng-zorro-antd admin panel front-end framework.

## Structure

The project is a mono-repo managed by [lerna](https://lernajs.io). It is structured like this:

* `apps/`
  * `alain` The Admin interface built with Angular base on ng-alain.
  * `api` The REST API built with LoopBack.
* `modules/`
  * `alain-*` Modules that add functionality to the Admin app base on ng-alain.
  * `api-*` Modules that add functionality to the API app.
* `packages/`
  * `alain-*` Packages used by the Admin app base on ng-alain.
  * `api-*` Packages used by the API app.

The structure of this project is inspired by this great example:
[OasisDigital/scalable-enterprise-angular](https://github.com/OasisDigital/scalable-enterprise-angular).

## Installation

### Requirements

#### Software installed on your system:

* `node` (v6.9.x or higher).
* `npm` (v3.x or higher).

#### Globally installed Node packages:

* [Angular CLI](https://github.com/angular/angular-cli)
* [Lerna](https://github.com/lerna/lerna)
* [LoopBack CLI](https://github.com/strongloop/loopback-cli)

```bash
npm install -g @angular/cli lerna loopback-cli
```

### Setup

Clone the repository and install the dependencies:

```bash
git clone https://github.com/IsCaster/ht-cloud.git
cd ht-cloud
npm install
lerna bootstrap
```

## Development

### Running in development mode

When the project is running in development mode the API and the Admin will restart automatically when a code change is
detected.

#### URLs

* The API listens on <http://127.0.0.1:3000>.
* The Admin listens on <http://127.0.0.1:4200>.

#### Start the project

From inside the project dir run `npm run dev:api && npm run dev:alain`:

```bash
npm run dev:api
npm run dev:alain
```

This will start both the API and the Admin in the same terminal.

You can also start the two components separately:

#### Start the API

```bash
npm run dev:api
```

#### Start the Admin

```bash
npm run dev:alain
```

#### Clean up the project

During development it can be useful to bring the project back to a clean state. To do this run:

```bash
npm run clean && npm install && lerna bootstrap
```

### Configuring the development setup

#### local.yaml

You can configure the API in development mode by creating a `local.yaml` file in `config`. The contents of this file is
not tracked by git so it only lives on your local machine.

To start with the default settings copy `config/default.yaml` to `config/local.yaml`.

#### Sample data

The API comes with a set of sample data for development.

To load the sample data when starting the API update [`local.yaml`](#localyaml) to include:

```yaml
system:
  initdb: true
```

You can also use the `INITDB` environment variable.

#### API Base Url

By default the development stack assumes that the API and Admin are both started on localhost (using `127.0.0.1`).

In order to run the API on another host than localhost the admin needs to know on which IP address it can reach the API.
To do this you need to update the `api.baseUrl` config property.

> Make sure to configure the API Base Url **without** a trailing slash.

To set the API Base Url update [`local.yaml`](#localyaml) to include:

```yaml
api:
  # Do not use trailing spaces for the baseUrl
  baseUrl: http://192.168.12.34:3000
```

You can also use the `API_BASE_URL` environment variable.

You should now be able to connect to the Admin on <http://192.168.12.34:9000> and it should connect to the API.

### Development Servers

Ht-cloud comes with a Docker Compose configuration for running development servers easily.

#### mongodb

To use the mongodb server update [`local.yaml`](#localyaml) to include:

```yaml
mongodb:
  url: mongodb://localhost/ht-cloud
```

You can also use the `MONGODB_URL` environment variable

To use the redis server update [`local.yaml`](#localyaml) to include:

```yaml
redis:
  url: redis://localhost
  expireDays: 7
```

You can also use the `MONGODB_URL` environment variable

#### mailhog

To use the mailhog server update [`local.yaml`](#localyaml) to include:

```yaml
smtp:
  host: localhost
  port: 1025
```

You can also use the `SMTP_HOST` and `SMTP_PORT` environment variables

#### Start the servers

```bash
npm run servers # or: npm run servers:start
```

#### Show the servers logging

```bash
npm run servers:logs
```

#### Stop the servers

```bash
npm run servers:stop
```

#### Delete the servers

```bash
npm run servers:rm
```
