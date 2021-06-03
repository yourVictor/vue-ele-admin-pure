FROM hub.c.163.com/library/nginx
EXPOSE 9000
RUN rm /etc/nginx/conf.d/default.conf
ADD default.conf /etc/nginx/conf.d/
ADD ./dist /usr/share/nginx/html/
