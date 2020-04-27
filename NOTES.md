# Review notes

These are just some feedback items that I see for the project. Thank you for
giving me the chance to review it.

## Overall

I'm _really_ digging the novel and well-styled presentation of the data in this
app. The card layout for browsing dogs, the right-hugging profile box for the
dogs and my profile, the box shadow on the header navigation bar, your use of
Avro, I am very much in like with this site. I would encourage you to add some
media queries in there to let it fit narrower screens just because it's so darn
good on wider ones.

Even though I tried to hack the site using my trusty API client (Insomnia, in
case you're interested, because I despise Postman :-), I couldn't. The backend
is locked down tighter than a tightly-locked down thing. I commend this group on
a strong focus on security.

Great use of working outside your known technologies and bringing in SASS as a
more maintainable alternative to just CSS. Kudos!

I like that you have two different roles in this application, that of adopter
and that of shelter manager. That's really an excellent use of authorization and
authentication. Color me pleased.

I am impressed by the overall polish of this Web application. Again, really well
done.

I did have some trouble editing my "perfect adoption" profile. It didn't seem to
show the saved values in the form when I opened it back up.

I am going to admit that this review is pretty short because there's not much I
can find to suggest to make it better. Sorry.

## Source files

Here is some stuff about the source files.

### README.md

The README is a little anemic. It would stand to have some more content, like a
link to the live site on Heroku and some notes on the overall design of the
front-end. But, mostly, the link to the live site. Because there was none, I had
to figure out the environment variables and stuff to run it locally.

I'd also include SASS in the list of technologies used for the frontend.

### index.js

This is nicely laid out. Thanks for that. It's easy to read, easy to understand,
and (in the long run for you) easy to maintain.

Just a small aside: you import the `asyncHandler` and do not use it, anywhere. I
would recommend wrapping all of your `async` route handlers in it so that you
get the maximum benefit of its existence.

### Pug templates

These seem really well laid out and organized. (I am a two-space indent kind of
person, so these seem _really_ wide to me. :-) I like that the longest file is
only 61 lines. You are economical without being unreasonable.

It'd be better (in the long run) if the data for things like "Age group" or
"Size" came from the back-end.

### SASS templates

I like that you used SASS to break up the styles into includes that group
together styles into related modules. I would, for long-term maintainability,
suggest you use a better naming scheme. If you don't like BEM (and, personally,
I don't), there are others out there to which you can adhere. (I am a fan of
SMACSS http://smacss.com/.)

### JavaScript files

The **log-in.js** file has a refactoring opportunity. The code that is there for
the "log in as an adopter" and "log in as a shelter" shares **a lot** of
behavior. You could probably reduce the number of lines of code by 40% by
extracting the common stuff into a function.

Oooh! The same goes for **register.js**.

Oh! And, in **shelter-profile.js**.

And, again, in **user-pet-list.js** but shared with **shelter-profile.js**.

And, **user-profile.js**.

All of those files share, at a minimum, code that generates a pet list. It would
be really great if that code were put in its own module and used over and over
rather than having the same string-building code present in at least four
places.
