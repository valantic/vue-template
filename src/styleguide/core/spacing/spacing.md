See app/setup/scss/variables/_spacing.scss and app/setup/scss/mixins/_spacings.scss


### Available global variables

```html
$spacing--0
$spacing--5
$spacing--10
$spacing--15
$spacing--20
$spacing--30
$spacing--40
$spacing--50
$spacing--60
$spacing--70
$spacing--80
$spacing--90
$spacing--100
```

### Available classes
General

```html
.spacing--bottom-{0-100}
.spacing--top-{0-100}
```

Media queries "UP"

```html
.spacing--{bottom/top}-xxs-up-{0-100}
.spacing--{bottom/top}-xs-up-{0-100}
.spacing--{bottom/top}-sm-up-{0-100}
.spacing--{bottom/top}-md-up-{0-100}
.spacing--{bottom/top}-lg-up-{0-100}
.spacing--{bottom/top}-xl-up-{0-100}

```
Media queries "ONLY" - use this only where it's not possible with "UP"

```html
.spacing--{bottom/top}-xxs-only-{0-100}
.spacing--{bottom/top}-xs-only-{0-100}
.spacing--{bottom/top}-sm-only-{0-100}
.spacing--{bottom/top}-md-only-{0-100}
.spacing--{bottom/top}-lg-only-{0-100}
.spacing--{bottom/top}-xl-only-{0-100}
```

Standard definition example

```html
<div class="spacing--bottom-15 spacing--bottom-sm-up-0"><div>
```
