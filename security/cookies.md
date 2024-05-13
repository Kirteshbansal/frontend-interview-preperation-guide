# **==cookies==** 

 Read  <https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies> for more details

## **==set cookies==** 

Set-Cookie: <cookie-name>=<cookie-value>  (Server can set multiple)

## **==Delete Cookies==**

* Permanent cookies are deleted after the date specified in the `Expires` attribute:

  ```javascript
  Set-Cookie: id=a3fWa; Expires=Thu, 31 Oct 2021 07:28:00 GMT;
  ```
* after the period specified in the `Max-Age` attribute:

  ```javascript
  Set-Cookie: id=a3fWa; Max-Age=2592000
  ```

  **Note:** `Expires` has been available for longer than `Max-Age`, however `Max-Age` is less error-prone, and takes precedence when both are set. The rationale behind this is that when you set an `Expires` date and time, they're relative to the client the cookie is being set on. If the server is set to a different time, this could cause errors.
* *Session* cookies — cookies without a `Max-age` or `Expires` attribute – are deleted when the current session ends. The browser defines when the "current session" ends, and some browsers use *session restoring* when restarting. This can cause session cookies to last indefinitely.


## **==Cookies security==**

You can ensure that cookies are sent securely and aren't accessed by unintended parties or scripts in one of two ways: with the `Secure` attribute and the `HttpOnly` attribute:

```javascript
Set-Cookie: id=a3fWa; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly
```

* A cookie with the `Secure` attribute is only sent to the server with an encrypted request over the HTTPS protocol. It's never sent with unsecured HTTP (except on localhost), which means __[man-in-the-middle](https://developer.mozilla.org/en-US/docs/Glossary/MitM)__ attackers can't access it easily. Insecure sites (with `http:` in the URL) can't set cookies with the `Secure` attribute. However, don't assume that `Secure` prevents all access to sensitive information in cookies. For example, someone with access to the client's hard disk (or JavaScript if the `HttpOnly` attribute isn't set) can read and modify the information.
* A cookie with the `HttpOnly` attribute can't be modified by JavaScript, for example using `Document.cookie`; it can only be modified when it reaches the server. Cookies that persist user sessions for example should have the `HttpOnly` attribute set — it would be really insecure to make them available to JavaScript. This precaution helps mitigate cross-site scripting (__[XSS](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks#cross-site_scripting_(xss))__) attacks.



## **==Define where cookies are sent==**

The `Domain` and `Path` attributes define the *scope* of a cookie: what URLs the cookies are sent to.

* The `Domain` attribute specifies which server can receive a cookie. If specified, cookies are available on the specified server and its subdomains. For example, if you set `Domain=mozilla.org` from `mozilla.org`, cookies are available on that domain and subdomains like `developer.mozilla.org`.

  ```javascript
  Set-Cookie: id=a3fWa; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly; Domain=mozilla.org
  ```

  If the `Set-Cookie` header does not specify a `Domain` attribute, the cookies are available on the server that sets it *but not on its subdomains*. Therefore, specifying `Domain` is less restrictive than omitting it. However, it can be helpful when subdomains need to share information about a user. Note that you can't set a different domain to the one the header is set from, or one of its subdomains; see __[Invalid domains](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#invalid_domains)__ for more details.
* The `Path` attribute indicates a URL path that must exist in the requested URL in order to send the `Cookie` header. For example:

  `Set-Cookie: id=a3fWa; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly; Path=/docs`

  The `%x2F` ("/") character is considered a directory separator, and subdirectories match as well. For example, if you set `Path=/docs`, these request paths match:
  * `/docs`
  * `/docs/`
  * `/docs/Web/`
  * `/docs/Web/HTTP`

  But these request paths don't:
  * `/`
  * `/docsets`
  * `/fr/docs`

## ==Controlling third-party cookies with SameSite==

The `SameSite` attribute lets servers specify whether/when cookies are sent with cross-site requests — i.e. __[third-party cookies](https://developer.mozilla.org/en-US/docs/Web/Privacy/Third-party_cookies)__. Cross-site requests are requests where the __[site](https://developer.mozilla.org/en-US/docs/Glossary/Site)__ (the registrable domain) and/or the scheme (http or https) do not match the site the user is currently visiting. This includes requests sent when links are clicked on other sites to navigate to your site, and any request sent by embedded third-party content.

`SameSite` helps to prevent leakage of information, preserving user __[privacy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#privacy_and_tracking)__ and providing some protection against __[cross-site request forgery](https://developer.mozilla.org/en-US/docs/Glossary/CSRF)__ attacks. It takes three possible values: `Strict`, `Lax`, and `None`:

* `Strict` causes the browser to only send the cookie in response to requests originating from the cookie's origin site. This should be used when you have cookies relating to functionality that will always be behind an initial navigation, such as authentication or storing shopping cart information.

  ```javascript
  Set-Cookie: cart=110045_77895_53420; SameSite=Strict
  ```

  **Note:** Cookies that are used for sensitive information should also have a short __[lifetime](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#removal_defining_the_lifetime_of_a_cookie)__.
* `Lax` is similar, except the browser also sends the cookie when the user *navigates* to the cookie's origin site (even if the user is coming from a different site). This is useful for cookies affecting the display of a site — for example you might have partner product information along with an affiliate link on your website. When that link is followed to the partner website, they might want to set a cookie stating that the affiliate link was followed, which displays a reward banner and provides a discount if the product is purchased.

  ```javascript
  Set-Cookie: affiliate=e4rt45dw; SameSite=Lax
  ```
* `None` specifies that cookies are sent on both originating and cross-site requests. This is useful if you want to send cookies along with requests made from third-party content embedded in other sites, for example, ad-tech or analytics providers. Note that if `SameSite=None` is set then the `Secure` attribute must also be set — `SameSite=None` requires a *secure context*.

  ```javascript
  Set-Cookie: widget_session=7yjgj57e4n3d; SameSite=None; Secure; HttpOnly
  ```

If no `SameSite` attribute is set, the cookie is treated as `Lax` by default.

 \n 