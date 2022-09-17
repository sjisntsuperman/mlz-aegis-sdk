# Aegis

一个简便的前端监控 SDK。仅供学习使用。

目前仅支持浏览器侧。

项目结构：

- browser
- core
- types
- typescript
- utils

## Test

单元测试有时间再补。

## Skill

- 监听错误并上报，目前支持`Console` `unrejectedexception` `settimeout` `setinterval` `XMLRequestHttp` `click`
  `requestAnimationFrame`
- 削峰：请求使用限制默认 100 数量的队列，有效防止大量请求导致的阻塞，默认使用 fetch，兜底为 xhr

## Core

提供 BaseClient、BaseTransport、Subscribe 类。

Subscribe 监听 notify 队列，并在捕获到错误之后遍历队列并执行 notify。

## Browser

提供浏览器侧的 BrowserClient 类、BrowserTransport 类、HandlerIntegration 等。

### HandlerIntegration

错误监听器，捕获到错误之后通过 notify 上报。

## BaseOptionsFieldsType

- dsn?: string

## Get Started

```js
import { createInstance } from '@steinwei/aegies';

const Aegis = createInstance({
  dsn: 'http://xxx.com',
});

// 手动上报
Aegis.log({
  data: payload,
});
```
