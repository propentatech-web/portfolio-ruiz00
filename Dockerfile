FROM propentatech/portfolios-formation-dev-web2026:latest

RUN mkdir -p /usr/share/nginx/html/portfolio-ruiz00/
RUN rm -rf /usr/share/nginx/html/portfolio-ruiz00/*

COPY . /usr/share/nginx/html/portfolio-ruiz00/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
