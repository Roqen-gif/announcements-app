import slugifyBase from 'slugify';


export function makeSlug(input: string) {
return slugifyBase(input, { lower: true, strict: true }).slice(0, 200);
}