FROM nginx:1.25.2

# to get nginx_more_headers
# DON't do this, because there are version mismatches
# especially when using custom dynamic modules like brotli
# RUN apt-get install -y nginx-extras

###################################
#### BEGIN BUILD nginx-brotli

# we need the source of nginx and ngx_brotli,
# but we don't compile nginx ourself
# we just need the nginx source code in order
# to be able to build a dynamic module

# always update first; docker guidelines
RUN apt-get update && apt-get install -y git wget
# MUST MATCH WITH FIRST LINE/MAIN VERSION
RUN wget https://nginx.org/download/nginx-1.25.2.tar.gz
RUN tar zxvf nginx-1.25.2.tar.gz
RUN rm nginx-1.25.2.tar.gz

RUN git clone https://github.com/google/ngx_brotli.git
WORKDIR ngx_brotli
RUN git submodule update --init
WORKDIR ..

RUN apt-get update && apt-get install -y build-essential libpcre3 libpcre3-dev zlib1g zlib1g-dev openssl libssl-dev libbrotli-dev
WORKDIR nginx-1.25.2
RUN ./configure --with-compat --add-dynamic-module=../ngx_brotli
RUN make modules -j $(nproc)
# --
RUN mkdir -p /usr/share/nginx/modules
RUN cp objs/ngx_http_brotli_filter_module.so /usr/share/nginx/modules
RUN cp objs/ngx_http_brotli_static_module.so /usr/share/nginx/modules
# sometimes nginx loads the modules from /etc/nginx, sometimes from /usr/share/nginx ..
# => provide the module in both places
RUN mkdir -p /etc/nginx/modules
RUN ln -s /usr/share/nginx/modules/ngx_http_brotli_filter_module.so /etc/nginx/modules/
RUN ln -s /usr/share/nginx/modules/ngx_http_brotli_static_module.so /etc/nginx/modules/
WORKDIR ..

#### END BUILD nginx-brotli
###################################

# remove default conf
RUN rm /etc/nginx/conf.d/default.conf
# copy own nginx conf
COPY nginx.conf /etc/nginx
# copy angular app into nginx static content
COPY ./dist/wambo-web /usr/share/nginx/html/
# we don't need the .htaccess file in nginx :)
RUN rm -f /usr/share/nginx/html/.htaccess
# check nginx conf file
RUN nginx -t
# expose this volume
VOLUME /var/log/nginx
