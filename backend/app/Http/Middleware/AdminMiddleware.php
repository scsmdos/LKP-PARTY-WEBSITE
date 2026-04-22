<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && file_exists(app_path('Models/Admin.php')) && get_class($request->user()) === 'App\Models\Admin') {
            return $next($request);
        }
        
        return response()->json(['message' => 'Forbidden Access'], 403);
    }
}
