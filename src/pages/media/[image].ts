import type { APIRoute, GetStaticPaths } from 'astro';
import { loadAtlas } from '../../lib/content';

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await loadAtlas({ review: __ATLAS_REVIEW__ });
  const images = new Map(entries.map((e) => [e.imageName, e]));
  return [...images].map(([image, example]) => ({ params: { image }, props: { example } }));
};

export const GET: APIRoute = ({ props }) => {
  const { example } = props;
  return new Response(new Uint8Array(example.imageBytes), { headers: { 'Content-Type': example.imageType } });
};
