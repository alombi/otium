import { writable } from "svelte/store";

export const isAdded = writable(false)

export const bookshelfTag = writable()

export const isStarred = writable(false)

export const notifsUnread = writable(false)