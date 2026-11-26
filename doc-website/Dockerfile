FROM python:3-alpine

RUN apk add git pandoc yarn

WORKDIR /mediabundle-doc/

RUN pip install zensical markdown-callouts

CMD ["zensical", "serve"]
