export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const REST_API_KEY = process.env.KAKAO_REST_API_KEY;

  const apiUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`;
  const response = await fetch(apiUrl, {
    headers: { Authorization: `KakaoAK ${REST_API_KEY}` },
  });
  const data = await response.json();

  if (data.documents && data.documents.length > 0) {
    const { x, y } = data.documents[0];
    return Response.json({ longitude: x, latitude: y });
  } else {
    return new Response(
      JSON.stringify({ message: "No coordinates found for provided address." }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }
}
