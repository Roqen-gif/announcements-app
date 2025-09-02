import { z } from 'zod';


const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4} ([01]\d|2[0-3]):[0-5]\d$/;


export const AnnouncementCreateSchema = z.object({
title: z.string().min(1).max(255),
content: z.string().min(1),
publicationDate: z.string().regex(dateRegex, 'Invalid date format. Use MM/DD/YYYY HH:mm'),
categories: z.array(z.string()).min(1)
});


export type AnnouncementCreate = z.infer<typeof AnnouncementCreateSchema>;