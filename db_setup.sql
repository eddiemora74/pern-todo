create table todos
(
    id         bigserial    not null
        constraint todos_pk
            primary key,
    "Todo"     varchar(255) not null,
    "Status"   integer      not null,
    "Priority" integer      not null
);