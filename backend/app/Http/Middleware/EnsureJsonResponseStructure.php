<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureJsonResponseStructure
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if ($response instanceof \Illuminate\Http\JsonResponse) {
            $data = $response->getData(true);

            // Ensure success key is at the beginning
            $data = array_merge([
                'success' => $response->isSuccessful(),
            ], is_array($data) ? $data : ['data' => $data]);

            $response->setData($data);
        }

        return $response;
    }
}
