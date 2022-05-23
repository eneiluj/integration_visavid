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

	public function __construct(string   $appName,
								IRequest $request,
								LoggerInterface $logger,
								VisavidAPIService $visavidAPIService,
								?string  $userId) {
		parent::__construct($appName, $request);
		$this->userId = $userId;
		$this->logger = $logger;
		$this->visavidAPIService = $visavidAPIService;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 *
	 * @return TemplateResponse
	 */
	public function index(): TemplateResponse {
		return new TemplateResponse(Application::APP_ID, 'main', []);
	}
}
