import { writable } from "svelte/store";

export const notifsUnread = writable(false)
export const isAdded = writable(false)
export const bookshelfTag = writable('')
export const isStarred = writable(false)
export const progress = writable(0)
export const pagesRead = writable(0)