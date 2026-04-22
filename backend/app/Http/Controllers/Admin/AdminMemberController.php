<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminMemberController extends Controller
{
    public function index(Request $request)
    {
        $query = Member::query();

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function($q) use ($s) {
                $q->where('full_name', 'like', "%{$s}%")
                  ->orWhere('mobile', 'like', "%{$s}%")
                  ->orWhere('member_id', 'like', "%{$s}%");
            });
        }
        if ($request->filled('state'))    $query->where('state', $request->state);
        if ($request->filled('district')) $query->where('district', $request->district);
        if ($request->filled('block'))    $query->where('block', $request->block);
        if ($request->filled('status'))   $query->where('status', $request->status);
        if ($request->filled('gender'))   $query->where('gender', $request->gender);
        if ($request->filled('date_from')) $query->whereDate('created_at', '>=', $request->date_from);
        if ($request->filled('date_to'))   $query->whereDate('created_at', '<=', $request->date_to);

        $perPage = $request->input('per_page', 20);
        $members = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json([
            'data' => $members->items(),
            'meta' => [
                'current_page' => $members->currentPage(),
                'last_page' => $members->lastPage(),
                'total' => $members->total(),
            ]
        ]);
    }

    public function show($id)
    {
        $member = Member::with(['familyMembers', 'socialProfiles'])->findOrFail($id);
        return response()->json(['data' => $member]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate(['status' => 'required|in:active,inactive,pending']);
        $member = Member::findOrFail($id);
        $member->update(['status' => $request->status]);
        return response()->json(['message' => 'Status updated']);
    }

    public function overview()
    {
        return response()->json(['data' => [
            'total' => Member::count(),
            'active' => Member::where('status', 'active')->count(),
            'pending' => Member::where('status', 'pending')->count(),
            'today' => Member::whereDate('created_at', today())->count(),
        ]]);
    }

    public function byState()
    {
        $data = Member::select('state', DB::raw('count(*) as count'))
            ->whereNotNull('state')
            ->groupBy('state')
            ->get();
        return response()->json(['data' => $data]);
    }

    public function growth()
    {
        $members = Member::whereNotNull('created_at')->orderBy('created_at', 'asc')->get();
        
        $grouped = $members->groupBy(function($m) {
            return \Carbon\Carbon::parse($m->created_at)->format('M Y');
        });

        $data = [];
        foreach($grouped as $month => $items) {
            $data[] = [
                'month' => $month,
                'count' => count($items)
            ];
        }

        // Return only last 12 months
        return response()->json(['data' => array_slice($data, -12)]);
    }

    public function export(Request $request)
    {
        // ... (existing export logic)
    }

    public function filterOptions(Request $request)
    {
        $type = $request->input('type'); // state, district, block
        $query = Member::query();

        if ($type === 'state') {
            $data = $query->whereNotNull('state')
                ->distinct()
                ->orderBy('state')
                ->pluck('state');
        } elseif ($type === 'district') {
            $state = $request->input('state');
            $data = $query->where('state', $state)
                ->whereNotNull('district')
                ->distinct()
                ->orderBy('district')
                ->pluck('district');
        } elseif ($type === 'block') {
            $district = $request->input('district');
            $data = $query->where('district', $district)
                ->whereNotNull('block')
                ->distinct()
                ->orderBy('block')
                ->pluck('block');
        } else {
            return response()->json(['data' => []]);
        }

        return response()->json(['data' => $data]);
    }
}
