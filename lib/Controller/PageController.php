<?php
/**
 * Nextcloud - Visavid integration
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Julien Veyssier <eneiluj@posteo.net>
 * @copyright Julien Veyssier 2022
 */

namespace OCA\Visavid\Controller;

use OCA\Visavid\Service\VisavidAPIService;
use OCP\AppFramework\Services\IInitialState;
use OCP\IConfig;
use Psr\Log\LoggerInterface;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\IRequest;

use OCA\Visavid\AppInfo\Application;

class PageController extends Controller {

	/**
	 * @var string|null
	 */
	private $userId;
	/**
	 * @var LoggerInterface
	 */
	private $logger;
	private VisavidAPIService $visavidAPIService;
	private IConfig $config;
	private IInitialState $initialStateService;

	public function __construct(string            $appName,
								IRequest          $request,
								IConfig           $config,
								IInitialState     $initialStateService,
								LoggerInterface   $logger,
								VisavidAPIService $visavidAPIService,
								?string           $userId) {
		parent::__construct($appName, $request);
		$this->userId = $userId;
		$this->logger = $logger;
		$this->visavidAPIService = $visavidAPIService;
		$this->config = $config;
		$this->initialStateService = $initialStateService;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 *
	 * @return TemplateResponse
	 */
	public function index(): TemplateResponse {
		$apiKey = $this->config->getAppValue(Application::APP_ID, 'api_key');
		$baseUrl = $this->config->getAppValue(Application::APP_ID, 'base_url');
		$pageInitialState = [
			'is_configured' => ($apiKey && $baseUrl),
		];
		$this->initialStateService->provideInitialState('page-state', $pageInitialState);
		return new TemplateResponse(Application::APP_ID, 'main', []);
	}
}
